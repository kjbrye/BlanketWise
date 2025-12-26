import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../components/auth';
import { linerFromDb, linerToDb, linerUpdatesToDb } from '../utils/caseConversion';

export function useLiners() {
  const { user } = useAuth();
  const [liners, setLiners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch liners from database
  const fetchLiners = useCallback(async () => {
    if (!user) {
      setLiners([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('liners')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      setLiners(data.map(linerFromDb));
      setError(null);
    } catch (err) {
      console.error('Error fetching liners:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchLiners();
  }, [fetchLiners]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('liners-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'liners',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Only add if not already present (prevents duplicates with optimistic updates)
            setLiners(prev => {
              if (prev.some(l => l.id === payload.new.id)) return prev;
              return [...prev, linerFromDb(payload.new)];
            });
          } else if (payload.eventType === 'UPDATE') {
            setLiners(prev =>
              prev.map(l => l.id === payload.new.id ? linerFromDb(payload.new) : l)
            );
          } else if (payload.eventType === 'DELETE') {
            setLiners(prev => prev.filter(l => l.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  // Add a new liner
  const addLiner = async (liner) => {
    if (!user) throw new Error('Must be logged in');

    const { data, error: insertError } = await supabase
      .from('liners')
      .insert([linerToDb(liner, user.id)])
      .select()
      .single();

    if (insertError) throw insertError;

    const newLiner = linerFromDb(data);
    setLiners(prev => [...prev, newLiner]);
    return newLiner;
  };

  // Update a liner
  const updateLiner = async (linerId, updates) => {
    if (!user) throw new Error('Must be logged in');

    const dbUpdates = linerUpdatesToDb(updates);

    const { error: updateError } = await supabase
      .from('liners')
      .update(dbUpdates)
      .eq('id', linerId)
      .eq('user_id', user.id);

    if (updateError) throw updateError;
  };

  // Delete a liner
  const deleteLiner = async (linerId) => {
    if (!user) throw new Error('Must be logged in');

    const { error: deleteError } = await supabase
      .from('liners')
      .delete()
      .eq('id', linerId)
      .eq('user_id', user.id);

    if (deleteError) throw deleteError;
  };

  // Pair liner with a blanket
  const pairWithBlanket = async (linerId, blanketId) => {
    await updateLiner(linerId, { pairedWithBlanketId: blanketId });
  };

  // Unpair liner from blanket
  const unpairFromBlanket = async (linerId) => {
    await updateLiner(linerId, { pairedWithBlanketId: null });
  };

  return {
    liners,
    loading,
    error,
    addLiner,
    updateLiner,
    deleteLiner,
    pairWithBlanket,
    unpairFromBlanket,
    refetch: fetchLiners,
  };
}
