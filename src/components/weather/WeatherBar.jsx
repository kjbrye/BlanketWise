import { Wind, Droplet, Moon, MapPin } from 'lucide-react';
import { WeatherIcon } from '../icons';

export default function WeatherBar({ weather, location, onLocationClick }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 px-4 bg-white/60 rounded-xl mb-6 gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[#5C4033]">
            <WeatherIcon condition={weather.condition} className="w-7 h-7" />
          </span>
          <div>
            <span className="text-xl sm:text-2xl font-bold text-[#5C4033]">{weather.temp}°F</span>
            <span className="text-xs sm:text-sm text-[#6B5344] ml-2">Feels like {weather.feelsLike}°F</span>
          </div>
        </div>
        <div className="hidden sm:block h-8 w-px bg-[rgba(139,69,19,0.15)]" />
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#6B5344] flex-wrap">
          <span className="flex items-center gap-1">
            <Wind className="w-4 h-4" /> {weather.wind} mph
          </span>
          <span className="flex items-center gap-1">
            <Droplet className="w-4 h-4" /> {weather.precipChance}%
          </span>
          <span className="flex items-center gap-1">
            <Moon className="w-4 h-4" /> Low {weather.tonightLow}°F
          </span>
        </div>
      </div>
      <button
        onClick={onLocationClick}
        className="flex items-center gap-1 text-xs sm:text-sm text-[#6B5344] hover:text-[#5C4033] transition-colors min-h-[44px] py-2"
      >
        <MapPin className="w-4 h-4" /> {location}
      </button>
    </div>
  );
}
