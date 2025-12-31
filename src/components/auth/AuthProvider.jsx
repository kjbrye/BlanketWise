import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { profileFromDb } from '../../utils/caseConversion';
import { withTimeout } from '../../utils/timeout';

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateProfile: async () => {},
});

const STORAGE_KEY = 'sb-pjbpzycakmzgnyvvlwws-auth-token';
const SESSION_TIMEOUT_MS = 3000; // Give up after 3 seconds
const PROFILE_TIMEOUT_MS = 5000; // 5 seconds for profile fetch

// Check if there's a stored session in localStorage (synchronous)
function hasStoredSession() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

// Clear stale session from localStorage
function clearStoredSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore errors
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  // Only show loading if there might be a session to restore
  const [loading, setLoading] = useState(hasStoredSession);

  useEffect(() => {
    // If no stored session, skip the network check - show login immediately
    if (!hasStoredSession()) {
      setLoading(false);
      // Still set up the listener for future auth events
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }
        }
      );
      return () => subscription.unsubscribe();
    }

    // There's a stored session - verify it with Supabase (with timeout)
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await withTimeout(
          supabase.auth.getSession(),
          SESSION_TIMEOUT_MS,
          'Session verification timed out'
        );
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        // If timed out or failed, clear stale session and show login
        clearStoredSession();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single(),
        PROFILE_TIMEOUT_MS
      );

      if (error) {
        // Profile might not exist yet if just signed up
        if (error.code === 'PGRST116') {
          setProfile({
            id: userId,
            email: user?.email,
            displayName: user?.email?.split('@')[0] || 'User',
          });
          return;
        }
        throw error;
      }

      setProfile(profileFromDb(data));
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password, displayName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates) => {
    if (!user) return;

    const dbUpdates = {};
    if (updates.displayName !== undefined) dbUpdates.display_name = updates.displayName;
    if (updates.locationLat !== undefined) dbUpdates.location_lat = updates.locationLat;
    if (updates.locationLng !== undefined) dbUpdates.location_lng = updates.locationLng;
    if (updates.locationName !== undefined) dbUpdates.location_name = updates.locationName;

    const { error } = await supabase
      .from('profiles')
      .update(dbUpdates)
      .eq('id', user.id);

    if (error) throw error;

    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
