import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../components/auth';
import { settingsFromDb, settingsToDb } from '../utils/caseConversion';
import { defaultSettings } from '../data/defaults';
import { withTimeout } from '../utils/timeout';

const FETCH_TIMEOUT_MS = 8000; // 8 second timeout for fetches

export function useSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveTimeoutRef = useRef(null);
  const pendingSettingsRef = useRef(null);

  // Fetch settings from database
  const fetchSettings = useCallback(async () => {
    if (!user) {
      setSettings(defaultSettings);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await withTimeout(
        supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .single(),
        FETCH_TIMEOUT_MS
      );

      if (fetchError) {
        // If no settings exist, use defaults (might happen on new signup)
        if (fetchError.code === 'PGRST116') {
          setSettings(defaultSettings);
          setError(null);
          return;
        }
        throw fetchError;
      }

      setSettings(settingsFromDb(data));
      setError(null);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(err.message);
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Save settings to database (debounced)
  const saveSettings = useCallback(async (newSettings) => {
    if (!user) return;

    setSaving(true);
    try {
      const dbSettings = settingsToDb(newSettings);

      const { error: upsertError } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          ...dbSettings,
        });

      if (upsertError) throw upsertError;
      setError(null);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [user]);

  // Update settings with debounce
  const updateSettings = useCallback((updates) => {
    // Calculate new settings
    const newSettings = typeof updates === 'function'
      ? updates(pendingSettingsRef.current || settings)
      : { ...settings, ...updates };

    // Handle nested updates (like liner or notifications)
    if (updates.liner) {
      newSettings.liner = { ...settings.liner, ...updates.liner };
    }
    if (updates.notifications) {
      newSettings.notifications = { ...settings.notifications, ...updates.notifications };
    }

    // Update local state immediately for responsive UI
    setSettings(newSettings);
    pendingSettingsRef.current = newSettings;

    // Debounce save (500ms)
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveSettings(pendingSettingsRef.current);
      pendingSettingsRef.current = null;
    }, 500);
  }, [settings, saveSettings]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        // Save any pending changes before unmount
        if (pendingSettingsRef.current) {
          saveSettings(pendingSettingsRef.current);
        }
      }
    };
  }, [saveSettings]);

  return {
    settings,
    loading,
    saving,
    error,
    updateSettings,
    refetch: fetchSettings,
  };
}
