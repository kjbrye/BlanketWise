import { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import MyHorses from './pages/MyHorses';
import BlanketInventory from './pages/BlanketInventory';
import Settings from './pages/Settings';

// Components
import { Navigation, Dashboard } from './components/layout';
import { LocationSearch } from './components/weather';

// Data & Utils
import { defaultHorse, defaultBlankets, defaultLiners, defaultWeather, defaultSettings } from './data/defaults';
import { fetchWeather, getCurrentPosition, reverseGeocode, DEFAULT_LOCATION } from './utils/weather';

// Auto-refresh interval: 30 minutes
const REFRESH_INTERVAL = 30 * 60 * 1000;

export default function App() {
  // Core state
  const [horses, setHorses] = useState([defaultHorse]);
  const [activeHorseId, setActiveHorseId] = useState(1);
  const [blankets, setBlankets] = useState(defaultBlankets);
  const [liners, setLiners] = useState(defaultLiners);
  const [currentBlanketId, setCurrentBlanketId] = useState(2);
  const [settings, setSettings] = useState(defaultSettings);

  // Weather state
  const [weather, setWeather] = useState(defaultWeather);
  const [forecast, setForecast] = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Location state
  const [location, setLocation] = useState(DEFAULT_LOCATION.name);
  const [coordinates, setCoordinates] = useState({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude
  });
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  // Ref to track if initial load has happened
  const initialLoadRef = useRef(false);
  const refreshIntervalRef = useRef(null);

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
      // Keep the last successful data (or default)
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
        // Try to get user's current location
        const position = await getCurrentPosition();
        const locationName = await reverseGeocode(position.latitude, position.longitude);

        setCoordinates(position);
        setLocation(locationName);
        await loadWeather(position.latitude, position.longitude);
      } catch (err) {
        console.log('Geolocation denied or failed, using default location:', err.message);
        // Use default location (Madison, WI)
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

  return (
    <BrowserRouter>
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
                setHorses={setHorses}
                activeHorseId={activeHorseId}
                setActiveHorseId={setActiveHorseId}
              />
            }
          />
          <Route
            path="/inventory"
            element={
              <BlanketInventory
                blankets={blankets}
                setBlankets={setBlankets}
                liners={liners}
                setLiners={setLiners}
                currentBlanketId={currentBlanketId}
                setCurrentBlanketId={setCurrentBlanketId}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                settings={settings}
                setSettings={setSettings}
                location={location}
                setLocation={setLocation}
                onLocationClick={() => setShowLocationSearch(true)}
              />
            }
          />
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
    </BrowserRouter>
  );
}
