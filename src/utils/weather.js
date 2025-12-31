/**
 * Open-Meteo Weather API Integration
 * Docs: https://open-meteo.com/en/docs
 */

const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_API_BASE = 'https://geocoding-api.open-meteo.com/v1/search';

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;
const REQUEST_TIMEOUT_MS = 10000;

/**
 * Fetch with retry logic and exponential backoff
 * @param {string} url - URL to fetch
 * @param {object} options - Fetch options
 * @param {number} retries - Number of retries remaining
 * @returns {Promise<Response>}
 */
async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // Retry on server errors (5xx) or rate limiting (429)
    if ((response.status >= 500 || response.status === 429) && retries > 0) {
      const delay = INITIAL_DELAY_MS * Math.pow(2, MAX_RETRIES - retries);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Retry on network errors or timeouts
    if (retries > 0 && (error.name === 'AbortError' || error.name === 'TypeError')) {
      const delay = INITIAL_DELAY_MS * Math.pow(2, MAX_RETRIES - retries);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1);
    }

    throw error;
  }
}

// Default location: Madison, WI
export const DEFAULT_LOCATION = {
  latitude: 43.0731,
  longitude: -89.4012,
  name: 'Madison, WI'
};

/**
 * Map WMO weather codes to our condition strings
 * https://open-meteo.com/en/docs#weathervariables
 */
function mapWeatherCode(code) {
  if (code === 0) return 'clear';
  if (code >= 1 && code <= 3) return 'partly-cloudy';
  if (code >= 45 && code <= 48) return 'cloudy'; // fog
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow';
  return 'cloudy'; // default fallback
}

/**
 * Get day name from date
 */
function getDayName(dateString, index) {
  if (index === 0) return 'Today';
  // Append time to avoid timezone issues (dateString is "YYYY-MM-DD" which JS parses as UTC midnight)
  const date = new Date(dateString + 'T12:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Fetch weather data from Open-Meteo API
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{current: object, forecast: array}>}
 */
export async function fetchWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'weather_code',
      'wind_speed_10m'
    ].join(','),
    hourly: [
      'temperature_2m',
      'precipitation_probability'
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'weather_code',
      'precipitation_probability_max'
    ].join(','),
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    timezone: 'auto',
    forecast_days: '7'
  });

  const response = await fetchWithRetry(`${WEATHER_API_BASE}?${params}`);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Find tonight's low from hourly data (next 12 hours overnight)
  const now = new Date();
  const currentHour = now.getHours();
  const hourlyTemps = data.hourly.temperature_2m;
  const hourlyTimes = data.hourly.time;

  // Get temperatures for the next 12 hours to find tonight's low
  let tonightLow = data.daily.temperature_2m_min[0];
  const overnightTemps = [];
  for (let i = 0; i < hourlyTimes.length && i < 24; i++) {
    const hourTime = new Date(hourlyTimes[i]);
    const hour = hourTime.getHours();
    // Consider evening (6pm) through early morning (6am) as "tonight"
    if (hour >= 18 || hour <= 6) {
      overnightTemps.push(hourlyTemps[i]);
    }
  }
  if (overnightTemps.length > 0) {
    tonightLow = Math.round(Math.min(...overnightTemps));
  }

  // Get precipitation probability for the next few hours
  const precipProbs = data.hourly.precipitation_probability.slice(0, 6);
  const maxPrecipChance = Math.max(...precipProbs.filter(p => p !== null), 0);

  // Format current weather to match our state shape
  const current = {
    temp: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    wind: Math.round(data.current.wind_speed_10m),
    humidity: Math.round(data.current.relative_humidity_2m),
    precipChance: maxPrecipChance,
    tonightLow: Math.round(tonightLow),
    condition: mapWeatherCode(data.current.weather_code)
  };

  // Format 7-day forecast
  const forecast = data.daily.time.map((date, index) => ({
    day: getDayName(date, index),
    condition: mapWeatherCode(data.daily.weather_code[index]),
    high: Math.round(data.daily.temperature_2m_max[index]),
    low: Math.round(data.daily.temperature_2m_min[index]),
    precipChance: data.daily.precipitation_probability_max[index] || 0
  }));

  return { current, forecast };
}

/**
 * Search for a location by city name using Open-Meteo Geocoding API
 * @param {string} query - City name to search
 * @returns {Promise<array>} - Array of matching locations
 */
export async function searchLocation(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: query.trim(),
    count: '5',
    language: 'en',
    format: 'json'
  });

  const response = await fetchWithRetry(`${GEOCODING_API_BASE}?${params}`);

  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.results) {
    return [];
  }

  return data.results.map(result => ({
    id: result.id,
    name: result.name,
    region: result.admin1 || '',
    country: result.country || '',
    latitude: result.latitude,
    longitude: result.longitude,
    displayName: [result.name, result.admin1, result.country]
      .filter(Boolean)
      .join(', ')
  }));
}

/**
 * Get user's current location via browser geolocation
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

/**
 * Reverse geocode coordinates to get location name
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<string>}
 */
export async function reverseGeocode(latitude, longitude) {
  // Open-Meteo doesn't have reverse geocoding, so we'll use a simple approach
  // Search for nearby locations and return the closest match
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      count: '1',
      language: 'en',
      format: 'json'
    });

    // Use the forecast API timezone to get a rough location name
    const response = await fetchWithRetry(`${WEATHER_API_BASE}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`);
    if (response.ok) {
      const data = await response.json();
      // Extract city from timezone (e.g., "America/Chicago" -> "Chicago")
      const timezone = data.timezone || '';
      const city = timezone.split('/').pop()?.replace(/_/g, ' ') || 'Current Location';
      return city;
    }
  } catch {
    // Ignore errors in reverse geocoding
  }
  return 'Current Location';
}
