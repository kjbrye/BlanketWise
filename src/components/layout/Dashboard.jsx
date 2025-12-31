import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Check, AlertTriangle, RefreshCw, Loader2 } from 'lucide-react';
import { WeatherBar } from '../weather';
import { RecommendationCard, DailySchedule } from '../recommendation';
import { HorseIcon, ClipperIcon, WeatherIcon } from '../icons';
import { getRecommendation, getDailySchedule } from '../../utils/recommendation';

// Map recommendation weights to short labels
const recLabels = { none: "None", sheet: "Sheet", light: "Light", medium: "Med", heavy: "Heavy" };

export default function Dashboard({
  horses, activeHorseId, setActiveHorseId,
  blankets, liners = [], currentBlanketId, setCurrentBlanketId,
  weather, forecast = [], settings, location,
  weatherLoading, weatherError, lastUpdated, onRefresh, onLocationClick,
  horsesLoading = false, blanketsLoading = false
}) {
  const activeHorse = horses.find(h => h.id === activeHorseId) || horses[0];

  // Memoize expensive recommendation calculations (must be called before conditional returns)
  const recommendation = useMemo(
    () => activeHorse ? getRecommendation(weather, activeHorse, settings, blankets, liners) : null,
    [weather, activeHorse, settings, blankets, liners]
  );

  const schedule = useMemo(
    () => activeHorse ? getDailySchedule(weather, activeHorse, settings, blankets, liners) : [],
    [weather, activeHorse, settings, blankets, liners]
  );

  // Compute recommendations for each forecast day based on high temp
  const forecastWithRecs = useMemo(() => {
    if (!activeHorse) return [];
    return forecast.map(day => {
      const dayWeather = {
        ...weather,
        temp: day.high,
        feelsLike: day.high - 4,
        precipChance: day.precipChance || 0,
        condition: day.condition
      };
      const rec = getRecommendation(dayWeather, activeHorse, settings, blankets, liners);
      return { ...day, rec: recLabels[rec.weightNeeded] };
    });
  }, [forecast, weather, activeHorse, settings, blankets, liners]);

  // Find upcoming cold snap for weather alert
  const coldDay = forecast.find(day => day.low <= 20);

  // Format last updated time
  const formatLastUpdated = () => {
    if (!lastUpdated) return null;
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 60000); // minutes
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return lastUpdated.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  // Show loading skeleton while horses are loading
  if (horsesLoading) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          <WeatherBar
            weather={weather}
            location={location}
            onLocationClick={onLocationClick}
          />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
            {/* Left column skeleton */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-20 bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="bg-white rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                <div className="h-16 bg-gray-200 rounded" />
              </div>
            </div>
            {/* Right column skeleton */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="space-y-2">
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle empty state - no horses yet
  if (!activeHorse || horses.length === 0) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          <WeatherBar
            weather={weather}
            location={location}
            onLocationClick={onLocationClick}
          />
          <div className="mt-8 text-center py-8 sm:py-16 px-4 bg-white rounded-2xl shadow border border-[rgba(139,69,19,0.1)]">
            <div className="flex justify-center mb-4">
              <HorseIcon className="w-20 h-20 text-[#D4A84B]" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#5C4033] mb-2">Welcome to BlanketWise!</h2>
            <p className="text-[#6B5344] mb-6 max-w-md mx-auto text-sm sm:text-base">
              Add your first horse to get personalized blanketing recommendations based on the weather.
            </p>
            <Link
              to="/horses"
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-[#9CAF88] text-white rounded-xl font-semibold hover:bg-[#7d9470] transition-colors"
            >
              <span className="text-xl">+</span> Add Your First Horse
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {/* Weather Bar with loading/error states */}
        <div className="relative">
          <WeatherBar
            weather={weather}
            location={location}
            onLocationClick={onLocationClick}
          />

          {/* Loading overlay */}
          {weatherLoading && (
            <div className="absolute inset-0 bg-white/60 rounded-xl flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-[#8B4513] animate-spin" />
            </div>
          )}
        </div>

        {/* Error message */}
        {weatherError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center justify-between">
            <span>{weatherError}</span>
            <button
              onClick={onRefresh}
              className="text-red-700 hover:text-red-900 font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* Refresh button and last updated */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          {/* Horse Selector (if multiple) */}
          {horses.length > 1 ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <span className="text-sm text-[#6B5344]">Recommendations for:</span>
              <select
                value={activeHorseId}
                onChange={(e) => setActiveHorseId(parseInt(e.target.value))}
                className="px-3 py-2 min-h-[44px] rounded-lg border border-[rgba(139,69,19,0.2)] focus:border-[#D4A84B] focus:outline-none bg-white text-sm font-medium text-[#5C4033]"
              >
                {horses.map(horse => (
                  <option key={horse.id} value={horse.id}>{horse.name}</option>
                ))}
              </select>
            </div>
          ) : (
            <div />
          )}

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={weatherLoading}
            className="flex items-center gap-2 text-sm text-[#6B5344] hover:text-[#5C4033] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${weatherLoading ? 'animate-spin' : ''}`} />
            {lastUpdated && <span className="text-xs">Updated {formatLastUpdated()}</span>}
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Left Column - Primary Content */}
          <div className="space-y-6">
            {/* Recommendation Card */}
            <RecommendationCard
              recommendation={recommendation}
              horse={activeHorse}
              settings={settings}
              currentBlanketId={currentBlanketId}
              setCurrentBlanketId={setCurrentBlanketId}
            />

            {/* Today's Schedule */}
            <div>
              <h3 className="text-sm font-medium text-[#6B5344] mb-3">Today's Schedule</h3>
              <DailySchedule schedule={schedule} />
            </div>

            {/* 7-Day Forecast */}
            <div>
              <h3 className="text-sm font-medium text-[#6B5344] mb-3">7-Day Outlook</h3>
              <div className="bg-white rounded-xl border border-[rgba(139,69,19,0.1)] overflow-x-auto">
                {forecastWithRecs.length > 0 ? (
                  <div className="grid grid-cols-7 divide-x divide-[rgba(139,69,19,0.1)] min-w-[420px]">
                    {forecastWithRecs.map((day, i) => (
                      <div
                        key={day.day}
                        className={`py-3 px-2 text-center ${i === 0 ? 'bg-[#D4A84B]/10' : ''}`}
                      >
                        <div className="text-xs text-[#6B5344]">{day.day}</div>
                        <div className="flex justify-center text-[#6B5344] my-1">
                          <WeatherIcon condition={day.condition} className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-medium text-[#5C4033]">{day.high}°/{day.low}°</div>
                        <div className="text-[10px] text-[#8B4513] mt-1">{day.rec}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-[#6B5344] text-sm">
                    {weatherLoading ? (
                      <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                    ) : (
                      'Forecast data unavailable'
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Secondary Content */}
          <div className="space-y-6">
            {/* Weather Alert - Dynamic based on forecast */}
            {coldDay && (
              <div className="bg-[#FEF3E2] border border-[#E89B3C]/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#E89B3C]">
                    <AlertTriangle className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-medium text-[#5C4033] text-sm">{coldDay.day}</div>
                    <p className="text-xs text-[#6B5344] mt-1">
                      Temperature drop to {coldDay.low}°F overnight. Have heavyweight ready.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Current Blanket */}
            <div className="bg-white rounded-xl border border-[rgba(139,69,19,0.1)] p-4">
              <h3 className="text-sm font-medium text-[#5C4033] mb-3">Blanket Inventory</h3>
              {blanketsLoading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              ) : (
                <div className="space-y-2">
                  {blankets.slice(0, 3).map(blanket => (
                    <button
                      key={blanket.id}
                      onClick={() => setCurrentBlanketId(blanket.id)}
                      className={`w-full flex items-center gap-3 p-3 min-h-[44px] rounded-lg text-left transition-colors ${
                        blanket.id === currentBlanketId
                          ? 'bg-[#9CAF88]/15 border border-[#9CAF88]'
                          : 'hover:bg-[#FDF8F0]'
                      }`}
                    >
                      <div className="w-2 h-8 rounded" style={{ backgroundColor: blanket.color }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#5C4033] truncate">{blanket.name}</div>
                        <div className="text-xs text-[#6B5344]">{blanket.grams}g</div>
                      </div>
                      {blanket.id === currentBlanketId && (
                        <span className="text-[#9CAF88]">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
              <Link
                to="/inventory"
                className="block text-center text-sm py-2 min-h-[44px] flex items-center justify-center text-[#8B4513] hover:text-[#5C4033] mt-3 transition-colors"
              >
                View all →
              </Link>
            </div>

            {/* Horse Profile */}
            <div className="bg-white rounded-xl border border-[rgba(139,69,19,0.1)] p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A0522D] to-[#8B4513] flex items-center justify-center text-white">
                  <HorseIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">{activeHorse.name}</div>
                  <div className="text-xs text-[#6B5344]">{activeHorse.breed} • {activeHorse.age} yrs</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-[#FDF8F0] rounded text-[#6B5344]">
                  {activeHorse.coatGrowth < 33 ? "Light" : activeHorse.coatGrowth < 66 ? "Medium" : "Heavy"} coat
                </span>
                {activeHorse.isClipped && <span className="px-2 py-1 bg-[#FDF8F0] rounded text-[#6B5344] flex items-center gap-1"><ClipperIcon className="w-3 h-3" /> Clipped</span>}
                {activeHorse.isSenior && <span className="px-2 py-1 bg-[#FDF8F0] rounded text-[#6B5344]">Senior</span>}
                {activeHorse.isFoal && <span className="px-2 py-1 bg-[#FDF8F0] rounded text-[#6B5344]">Foal</span>}
              </div>
              <Link
                to="/horses"
                className="block text-center text-sm py-2 min-h-[44px] flex items-center justify-center text-[#8B4513] hover:text-[#5C4033] mt-3 transition-colors"
              >
                Edit profile →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
