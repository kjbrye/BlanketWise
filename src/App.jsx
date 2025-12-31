import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { AuthProvider, useAuth, LoginForm, SignUpForm } from './components/auth';

// Hooks
import { useHorses, useBlankets, useLiners, useSettings, useOneSignal } from './hooks';

// Lazy-loaded pages (code splitting)
const MyHorses = lazy(() => import('./pages/MyHorses'));
const BlanketInventory = lazy(() => import('./pages/BlanketInventory'));
const Settings = lazy(() => import('./pages/Settings'));
const About = lazy(() => import('./pages/About'));

// Components (loaded eagerly - needed for main dashboard)
import { Navigation, Dashboard } from './components/layout';
import { LocationSearch } from './components/weather';

// Data & Utils
import { defaultWeather } from './data/defaults';
import { fetchWeather, getCurrentPosition, reverseGeocode, DEFAULT_LOCATION } from './utils/weather';

// Auto-refresh interval: 30 minutes
const REFRESH_INTERVAL = 30 * 60 * 1000;

// Loading fallback for lazy-loaded pages
function PageLoader() {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#FAF7F2] flex items-center justify-center">
      <div className="animate-pulse text-[#6B5344]">Loading...</div>
    </div>
  );
}

// Authenticated App - only rendered when user is logged in
function AuthenticatedApp() {
  const { user } = useAuth();

  // Initialize OneSignal with user ID for targeted notifications
  useOneSignal(user?.id);

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
    // Wait for settings to load before setting defaults to avoid overwriting persisted value
    if (settingsLoading) return;

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
  }, [blankets, currentBlanketId, setCurrentBlanketId, settingsLoading]);

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

  // Handle location selection from search (persists to settings)
  const handleLocationSelect = useCallback((newLocation) => {
    setLocation(newLocation.name);
    setCoordinates({
      latitude: newLocation.latitude,
      longitude: newLocation.longitude
    });
    // Persist location to settings
    updateSettings({
      locationLat: newLocation.latitude,
      locationLng: newLocation.longitude,
      locationName: newLocation.name,
    });
    loadWeather(newLocation.latitude, newLocation.longitude);
  }, [loadWeather, updateSettings]);

  // Handle "Use Current Location" button
  const handleUseCurrentLocation = useCallback(async () => {
    setWeatherLoading(true);
    try {
      const position = await getCurrentPosition();
      const locationName = await reverseGeocode(position.latitude, position.longitude);
      setCoordinates(position);
      setLocation(locationName);
      // Persist to settings
      updateSettings({
        locationLat: position.latitude,
        locationLng: position.longitude,
        locationName: locationName,
      });
      await loadWeather(position.latitude, position.longitude);
    } catch (err) {
      console.error('Failed to get current location:', err);
      setWeatherError('Unable to get current location. Please check your browser permissions.');
      setWeatherLoading(false);
    }
  }, [loadWeather, updateSettings]);

  // Manual refresh
  const handleRefresh = useCallback(() => {
    loadWeather(coordinates.latitude, coordinates.longitude);
  }, [coordinates, loadWeather]);

  // Start weather fetch immediately with default location (don't wait for settings)
  useEffect(() => {
    if (initialLoadRef.current) return;
    initialLoadRef.current = true;
    loadWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
  }, [loadWeather]);

  // Once settings loads, update to saved location if different from default
  const settingsLocationRef = useRef(false);
  useEffect(() => {
    if (settingsLocationRef.current) return;
    if (settings.locationLat && settings.locationLng && settings.locationName) {
      settingsLocationRef.current = true;
      // Only re-fetch if saved location differs from default
      if (settings.locationLat !== DEFAULT_LOCATION.latitude ||
          settings.locationLng !== DEFAULT_LOCATION.longitude) {
        setCoordinates({
          latitude: settings.locationLat,
          longitude: settings.locationLng,
        });
        setLocation(settings.locationName);
        loadWeather(settings.locationLat, settings.locationLng);
      } else {
        // Same as default, just update the display name
        setLocation(settings.locationName);
      }
    }
  }, [settings.locationLat, settings.locationLng, settings.locationName, loadWeather]);

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

  // Only block on settings - it's needed for location/weather initialization
  // Other data can load progressively with skeleton states
  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center">
        <div className="text-center">
          <img
            src="/BlanketWise-Logo.svg"
            alt="Loading"
            className="h-24 w-24 mx-auto mb-4 rounded-full animate-pulse"
          />
          <p className="text-[#6B5344]">Loading...</p>
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
              horsesLoading={horsesLoading}
              blanketsLoading={blanketsLoading}
            />
          }
        />
        <Route
          path="/horses"
          element={
            <Suspense fallback={<PageLoader />}>
              <MyHorses
                horses={horses}
                activeHorseId={activeHorseId}
                setActiveHorseId={setActiveHorseId}
                onAddHorse={addHorse}
                onUpdateHorse={updateHorse}
                onDeleteHorse={deleteHorse}
              />
            </Suspense>
          }
        />
        <Route
          path="/inventory"
          element={
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <Settings
                settings={settings}
                onUpdateSettings={updateSettings}
                location={location}
                setLocation={setLocation}
                onLocationClick={() => setShowLocationSearch(true)}
                onUseCurrentLocation={handleUseCurrentLocation}
              />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
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
