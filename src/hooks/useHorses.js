import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../components/auth';
import { horseFromDb, horseToDb, horseUpdatesToDb } from '../utils/caseConversion';
import { horseSchema, horseUpdateSchema, validateOrThrow } from '../lib/validation';
import { withTimeout } from '../utils/timeout';

const FETCH_TIMEOUT_MS = 8000; // 8 second timeout for fetches
const DEFAULT_LIMIT = 50; // Pagination limit

export function useHorses() {
  const { user } = useAuth();
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch horses from database
  const fetchHorses = useCallback(async () => {
    if (!user) {
      setHorses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await withTimeout(
        supabase
          .from('horses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(DEFAULT_LIMIT),
        FETCH_TIMEOUT_MS
      );

      if (fetchError) throw fetchError;
      setHorses(data.map(horseFromDb));
      setError(null);
    } catch (err) {
      console.error('Error fetching horses:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchHorses();
  }, [fetchHorses]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('horses-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'horses',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Only add if not already present (prevents duplicates with optimistic updates)
            setHorses(prev => {
              if (prev.some(h => h.id === payload.new.id)) return prev;
              return [...prev, horseFromDb(payload.new)];
            });
          } else if (payload.eventType === 'UPDATE') {
            setHorses(prev =>
              prev.map(h => h.id === payload.new.id ? horseFromDb(payload.new) : h)
            );
          } else if (payload.eventType === 'DELETE') {
            setHorses(prev => prev.filter(h => h.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  // Add a new horse
  const addHorse = async (horse) => {
    if (!user) throw new Error('Must be logged in');

    // Validate input
    const validatedHorse = validateOrThrow(horseSchema, horse);

    const { data, error: insertError } = await supabase
      .from('horses')
      .insert([horseToDb(validatedHorse, user.id)])
      .select()
      .single();

    if (insertError) throw insertError;

    const newHorse = horseFromDb(data);
    setHorses(prev => [...prev, newHorse]);
    return newHorse;
  };

  // Update a horse
  const updateHorse = async (horseId, updates) => {
    if (!user) throw new Error('Must be logged in');

    // Validate input
    const validatedUpdates = validateOrThrow(horseUpdateSchema, updates);
    const dbUpdates = horseUpdatesToDb(validatedUpdates);

    const { error: updateError } = await supabase
      .from('horses')
      .update(dbUpdates)
      .eq('id', horseId)
      .eq('user_id', user.id);

    if (updateError) throw updateError;

    setHorses(prev => prev.map(h => h.id === horseId ? { ...h, ...validatedUpdates } : h));
  };

  // Delete a horse
  const deleteHorse = async (horseId) => {
    if (!user) throw new Error('Must be logged in');

    const { error: deleteError } = await supabase
      .from('horses')
      .delete()
      .eq('id', horseId)
      .eq('user_id', user.id);

    if (deleteError) throw deleteError;

    setHorses(prev => prev.filter(h => h.id !== horseId));
  };

  return {
    horses,
    loading,
    error,
    addHorse,
    updateHorse,
    deleteHorse,
    refetch: fetchHorses,
  };
}
