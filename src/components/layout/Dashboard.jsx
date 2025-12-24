import { Link } from 'react-router-dom';
import { Check, AlertTriangle } from 'lucide-react';
import { WeatherBar } from '../weather';
import { RecommendationCard, DailySchedule } from '../recommendation';
import { HorseIcon, ClipperIcon, WeatherIcon } from '../icons';
import { getRecommendation, getDailySchedule } from '../../utils/recommendation';

export default function Dashboard({
  horses, activeHorseId, setActiveHorseId,
  blankets, currentBlanketId, setCurrentBlanketId,
  weather, settings, location
}) {
  const activeHorse = horses.find(h => h.id === activeHorseId) || horses[0];
  const recommendation = getRecommendation(weather, activeHorse, settings, blankets);
  const schedule = getDailySchedule(weather, activeHorse, settings, blankets);

  const forecast = [
    { day: "Today", condition: "partly-cloudy", high: 42, low: 28, rec: "Med" },
    { day: "Thu", condition: "cloudy", high: 38, low: 25, rec: "Heavy" },
    { day: "Fri", condition: "rain", high: 45, low: 32, rec: "Med" },
    { day: "Sat", condition: "snow", high: 30, low: 18, rec: "Heavy" },
    { day: "Sun", condition: "clear", high: 48, low: 30, rec: "Med" },
    { day: "Mon", condition: "partly-cloudy", high: 52, low: 35, rec: "Light" },
    { day: "Tue", condition: "clear", high: 55, low: 38, rec: "None" },
  ];

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Weather Bar */}
        <WeatherBar weather={weather} location={location} />

        {/* Horse Selector (if multiple) */}
        {horses.length > 1 && (
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-[#6B5344]">Recommendations for:</span>
            <select
              value={activeHorseId}
              onChange={(e) => setActiveHorseId(parseInt(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-[rgba(139,69,19,0.2)] focus:border-[#D4A84B] focus:outline-none bg-white text-sm font-medium text-[#5C4033]"
            >
              {horses.map(horse => (
                <option key={horse.id} value={horse.id}>{horse.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-[1fr_280px] gap-6">
          {/* Left Column - Primary Content */}
          <div className="space-y-6">
            {/* Recommendation Card */}
            <RecommendationCard
              recommendation={recommendation}
              horse={activeHorse}
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
              <div className="bg-white rounded-xl border border-[rgba(139,69,19,0.1)] overflow-hidden">
                <div className="grid grid-cols-7 divide-x divide-[rgba(139,69,19,0.1)]">
                  {forecast.map((day, i) => (
                    <div
                      key={i}
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
              </div>
            </div>
          </div>

          {/* Right Column - Secondary Content */}
          <div className="space-y-6">
            {/* Weather Alert */}
            <div className="bg-[#FEF3E2] border border-[#E89B3C]/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-[#E89B3C]">
                  <AlertTriangle className="w-5 h-5" />
                </span>
                <div>
                  <div className="font-medium text-[#5C4033] text-sm">Saturday</div>
                  <p className="text-xs text-[#6B5344] mt-1">
                    Temperature drop to 18°F overnight. Have heavyweight ready.
                  </p>
                </div>
              </div>
            </div>

            {/* Current Blanket */}
            <div className="bg-white rounded-xl border border-[rgba(139,69,19,0.1)] p-4">
              <h3 className="text-sm font-medium text-[#5C4033] mb-3">Blanket Inventory</h3>
              <div className="space-y-2">
                {blankets.slice(0, 3).map(blanket => (
                  <button
                    key={blanket.id}
                    onClick={() => setCurrentBlanketId(blanket.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
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
              <Link
                to="/inventory"
                className="block text-center text-xs text-[#8B4513] hover:text-[#5C4033] mt-3 transition-colors"
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
              </div>
              <Link
                to="/horses"
                className="block text-center text-xs text-[#8B4513] hover:text-[#5C4033] mt-3 transition-colors"
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
