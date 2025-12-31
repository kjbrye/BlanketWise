import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../components/auth';
import { blanketFromDb, blanketToDb, blanketUpdatesToDb } from '../utils/caseConversion';
import { blanketSchema, blanketUpdateSchema, validateOrThrow } from '../lib/validation';
import { withTimeout } from '../utils/timeout';
import { checkRateLimit, recordOperation } from '../utils/rateLimit';

const FETCH_TIMEOUT_MS = 8000; // 8 second timeout for fetches
const DEFAULT_LIMIT = 50; // Pagination limit

export function useBlankets() {
  const { user } = useAuth();
  const [blankets, setBlankets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blankets from database
  const fetchBlankets = useCallback(async () => {
    if (!user) {
      setBlankets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await withTimeout(
        supabase
          .from('blankets')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(DEFAULT_LIMIT),
        FETCH_TIMEOUT_MS
      );

      if (fetchError) throw fetchError;
      setBlankets(data.map(blanketFromDb));
      setError(null);
    } catch (err) {
      console.error('Error fetching blankets:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchBlankets();
  }, [fetchBlankets]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('blankets-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blankets',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Only add if not already present (prevents duplicates with optimistic updates)
            setBlankets(prev => {
              if (prev.some(b => b.id === payload.new.id)) return prev;
              return [...prev, blanketFromDb(payload.new)];
            });
          } else if (payload.eventType === 'UPDATE') {
            setBlankets(prev =>
              prev.map(b => b.id === payload.new.id ? blanketFromDb(payload.new) : b)
            );
          } else if (payload.eventType === 'DELETE') {
            setBlankets(prev => prev.filter(b => b.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  // Add a new blanket
  const addBlanket = async (blanket) => {
    if (!user) throw new Error('Must be logged in');

    // Check rate limit
    const { allowed, retryAfter } = checkRateLimit('mutation', user.id);
    if (!allowed) {
      throw new Error(`Too many requests. Please try again in ${retryAfter} seconds.`);
    }
    recordOperation('mutation', user.id);

    // Validate input
    const validatedBlanket = validateOrThrow(blanketSchema, blanket);

    const { data, error: insertError } = await supabase
      .from('blankets')
      .insert([blanketToDb(validatedBlanket, user.id)])
      .select()
      .single();

    if (insertError) throw insertError;

    const newBlanket = blanketFromDb(data);
    setBlankets(prev => [...prev, newBlanket]);
    return newBlanket;
  };

  // Update a blanket
  const updateBlanket = async (blanketId, updates) => {
    if (!user) throw new Error('Must be logged in');

    // Check rate limit
    const { allowed, retryAfter } = checkRateLimit('mutation', user.id);
    if (!allowed) {
      throw new Error(`Too many requests. Please try again in ${retryAfter} seconds.`);
    }
    recordOperation('mutation', user.id);

    // Validate input
    const validatedUpdates = validateOrThrow(blanketUpdateSchema, updates);
    const dbUpdates = blanketUpdatesToDb(validatedUpdates);

    const { error: updateError } = await supabase
      .from('blankets')
      .update(dbUpdates)
      .eq('id', blanketId)
      .eq('user_id', user.id);

    if (updateError) throw updateError;

    setBlankets(prev => prev.map(b => b.id === blanketId ? { ...b, ...validatedUpdates } : b));
  };

  // Delete a blanket
  const deleteBlanket = async (blanketId) => {
    if (!user) throw new Error('Must be logged in');

    // Check rate limit
    const { allowed, retryAfter } = checkRateLimit('mutation', user.id);
    if (!allowed) {
      throw new Error(`Too many requests. Please try again in ${retryAfter} seconds.`);
    }
    recordOperation('mutation', user.id);

    const { error: deleteError } = await supabase
      .from('blankets')
      .delete()
      .eq('id', blanketId)
      .eq('user_id', user.id);

    if (deleteError) throw deleteError;

    setBlankets(prev => prev.filter(b => b.id !== blanketId));
  };

  // Set blanket as currently on a specific horse
  const setBlanketOnHorse = async (blanketId, horseId) => {
    await updateBlanket(blanketId, { currentlyOnHorseId: horseId });
  };

  // Remove blanket from horse (set to available)
  const removeBlanketFromHorse = async (blanketId) => {
    await updateBlanket(blanketId, { currentlyOnHorseId: null, status: 'available' });
  };

  return {
    blankets,
    loading,
    error,
    addBlanket,
    updateBlanket,
    deleteBlanket,
    setBlanketOnHorse,
    removeBlanketFromHorse,
    refetch: fetchBlankets,
  };
}
