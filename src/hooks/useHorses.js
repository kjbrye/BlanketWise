import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../components/auth';
import { horseFromDb, horseToDb, horseUpdatesToDb } from '../utils/caseConversion';

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
      const { data, error: fetchError } = await supabase
        .from('horses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

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

    const { data, error: insertError } = await supabase
      .from('horses')
      .insert([horseToDb(horse, user.id)])
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

    const dbUpdates = horseUpdatesToDb(updates);

    const { error: updateError } = await supabase
      .from('horses')
      .update(dbUpdates)
      .eq('id', horseId)
      .eq('user_id', user.id);

    if (updateError) throw updateError;
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
