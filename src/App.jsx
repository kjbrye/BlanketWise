import { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { AuthProvider, useAuth, LoginForm, SignUpForm } from './components/auth';

// Hooks
import { useHorses, useBlankets, useLiners, useSettings } from './hooks';

// Pages
import MyHorses from './pages/MyHorses';
import BlanketInventory from './pages/BlanketInventory';
import Settings from './pages/Settings';

// Components
import { Navigation, Dashboard } from './components/layout';
import { LocationSearch } from './components/weather';

// Data & Utils
import { defaultWeather } from './data/defaults';
import { fetchWeather, getCurrentPosition, reverseGeocode, DEFAULT_LOCATION } from './utils/weather';

// Auto-refresh interval: 30 minutes
const REFRESH_INTERVAL = 30 * 60 * 1000;

// Authenticated App - only rendered when user is logged in
function AuthenticatedApp() {
  // Use custom hooks for data (replaces local state)
  const {
    horses,
    loading: horsesLoading,
    addHorse,
    updateHorse,
    deleteHorse,
  } = useHorses();

  const {
    blankets,
    loading: blanketsLoading,
    addBlanket,
    updateBlanket,
    deleteBlanket,
  } = useBlankets();

  const {
    liners,
    loading: linersLoading,
    addLiner,
    updateLiner,
    deleteLiner,
  } = useLiners();

  const {
    settings,
    loading: settingsLoading,
    updateSettings,
  } = useSettings();

  // Local state for UI selections (not persisted to DB)
  const [activeHorseId, setActiveHorseId] = useState(null);

  // Current blanket selection is persisted via settings
  const currentBlanketId = settings.currentBlanketId;
  const setCurrentBlanketId = useCallback((blanketId) => {
    updateSettings({ currentBlanketId: blanketId });
  }, [updateSettings]);

  // Weather state (stays local - API driven)
  const [weather, setWeather] = useState(defaultWeather);
  const [forecast, setForecast] = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Location state (stays local)
  const [location, setLocation] = useState(DEFAULT_LOCATION.name);
  const [coordinates, setCoordinates] = useState({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude
  });
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  // Refs
  const initialLoadRef = useRef(false);
  const refreshIntervalRef = useRef(null);

  // Set default active horse when horses load
  useEffect(() => {
    if (horses.length > 0 && !activeHorseId) {
      setActiveHorseId(horses[0].id);
    }
  }, [horses, activeHorseId]);

  // Set default current blanket when blankets load (only if not already persisted)
  useEffect(() => {
    if (blankets.length > 0 && !currentBlanketId) {
      // Check if persisted blanket still exists, otherwise use first blanket
      const inUse = blankets.find(b => b.status === 'in-use');
      setCurrentBlanketId(inUse?.id || blankets[0]?.id);
    } else if (currentBlanketId && blankets.length > 0) {
      // Verify persisted blanket still exists
      const blanketExists = blankets.some(b => b.id === currentBlanketId);
      if (!blanketExists) {
        setCurrentBlanketId(blankets[0]?.id || null);
      }
    }
  }, [blankets, currentBlanketId, setCurrentBlanketId]);

  // Fetch weather data
  const loadWeather = useCallback(async (lat, lng, showLoading = true) => {
    if (showLoading) {
      setWeatherLoading(true);
    }
    setWeatherError(null);

    try {
      const { current, forecast: forecastData } = await fetchWeather(lat, lng);
      setWeather(current);
      setForecast(forecastData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch weather:', err);
      setWeatherError('Failed to load weather data. Using cached data.');
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  // Handle location selection from search
  const handleLocationSelect = useCallback((newLocation) => {
    setLocation(newLocation.name);
    setCoordinates({
      latitude: newLocation.latitude,
      longitude: newLocation.longitude
    });
    loadWeather(newLocation.latitude, newLocation.longitude);
  }, [loadWeather]);

  // Manual refresh
  const handleRefresh = useCallback(() => {
    loadWeather(coordinates.latitude, coordinates.longitude);
  }, [coordinates, loadWeather]);

  // Initialize geolocation and weather on mount
  useEffect(() => {
    if (initialLoadRef.current) return;
    initialLoadRef.current = true;

    async function initializeLocation() {
      try {
        const position = await getCurrentPosition();
        const locationName = await reverseGeocode(position.latitude, position.longitude);
        setCoordinates(position);
        setLocation(locationName);
        await loadWeather(position.latitude, position.longitude);
      } catch (err) {
        console.log('Geolocation denied or failed, using default location:', err.message);
        await loadWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
      }
    }

    initializeLocation();
  }, [loadWeather]);

  // Set up auto-refresh interval
  useEffect(() => {
    refreshIntervalRef.current = setInterval(() => {
      loadWeather(coordinates.latitude, coordinates.longitude, false);
    }, REFRESH_INTERVAL);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [coordinates, loadWeather]);

  // Show loading state while data loads
  const isLoading = horsesLoading || blanketsLoading || linersLoading || settingsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center">
        <div className="text-center">
          <img
            src="/BlanketWise-Logo.svg"
            alt="Loading"
            className="h-24 w-24 mx-auto mb-4 rounded-full animate-pulse"
          />
          <p className="text-[#6B5344]">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      <Navigation
        location={location}
        onLocationClick={() => setShowLocationSearch(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              horses={horses}
              activeHorseId={activeHorseId}
              setActiveHorseId={setActiveHorseId}
              blankets={blankets}
              liners={liners}
              currentBlanketId={currentBlanketId}
              setCurrentBlanketId={setCurrentBlanketId}
              weather={weather}
              forecast={forecast}
              settings={settings}
              location={location}
              weatherLoading={weatherLoading}
              weatherError={weatherError}
              lastUpdated={lastUpdated}
              onRefresh={handleRefresh}
              onLocationClick={() => setShowLocationSearch(true)}
            />
          }
        />
        <Route
          path="/horses"
          element={
            <MyHorses
              horses={horses}
              activeHorseId={activeHorseId}
              setActiveHorseId={setActiveHorseId}
              onAddHorse={addHorse}
              onUpdateHorse={updateHorse}
              onDeleteHorse={deleteHorse}
            />
          }
        />
        <Route
          path="/inventory"
          element={
            <BlanketInventory
              blankets={blankets}
              liners={liners}
              currentBlanketId={currentBlanketId}
              setCurrentBlanketId={setCurrentBlanketId}
              onAddBlanket={addBlanket}
              onUpdateBlanket={updateBlanket}
              onDeleteBlanket={deleteBlanket}
              onAddLiner={addLiner}
              onUpdateLiner={updateLiner}
              onDeleteLiner={deleteLiner}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              settings={settings}
              onUpdateSettings={updateSettings}
              location={location}
              setLocation={setLocation}
              onLocationClick={() => setShowLocationSearch(true)}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Location Search Modal */}
      {showLocationSearch && (
        <LocationSearch
          currentLocation={location}
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowLocationSearch(false)}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

        body {
          font-family: 'Source Sans 3', sans-serif;
        }

        .font-display {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
}

// Auth Gate - shows login/signup for unauthenticated users
function AuthGate() {
  const { user, loading } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center">
        <img
          src="/BlanketWise-Logo.svg"
          alt="Loading"
          className="h-24 w-24 rounded-full animate-pulse"
        />
      </div>
    );
  }

  if (!user) {
    return showSignUp ? (
      <SignUpForm onSwitchToLogin={() => setShowSignUp(false)} />
    ) : (
      <LoginForm onSwitchToSignUp={() => setShowSignUp(true)} />
    );
  }

  return <AuthenticatedApp />;
}

// Main App component - wraps everything with providers
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </BrowserRouter>
  );
}
