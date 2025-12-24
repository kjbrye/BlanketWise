import React, { useState } from 'react';
import {
  MapPin, Pencil, Thermometer, Wind, CloudRain, Zap, SlidersHorizontal,
  Bell, AlertTriangle, Calendar, BarChart3, Clock, Save, Download,
  Trash2, Heart, User, Scale, Menu, Snowflake
} from 'lucide-react';

// Custom clipper icon
function ClipperIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 375 375" fill="none">
      <path fill="currentColor" fillRule="nonzero" d="M 185.445312 78.359375 C 180.734375 85.28125 176.394531 91.636719 172.226562 97.621094 C 161.777344 112.613281 152.410156 125.285156 141.042969 138.832031 C 139.902344 140.199219 138.738281 141.570312 137.550781 142.957031 C 137.484375 143.035156 137.410156 143.121094 137.339844 143.195312 C 134.675781 146.304688 131.894531 149.464844 128.964844 152.722656 C 127.984375 153.808594 127 154.894531 125.996094 156.003906 C 125.199219 156.882812 124.378906 157.765625 123.546875 158.664062 C 122.113281 160.226562 120.621094 161.824219 119.109375 163.441406 C 116.875 165.804688 114.578125 168.230469 112.160156 170.738281 C 111.96875 170.945312 111.761719 171.148438 111.5625 171.359375 C 106.605469 176.5 101.234375 181.957031 95.355469 187.832031 C 85.585938 207 85.652344 227.0625 97.324219 238.722656 C 108.996094 250.382812 129.074219 250.449219 148.261719 240.6875 C 157.246094 231.714844 165.265625 223.914062 172.675781 216.960938 C 176.394531 213.480469 179.949219 210.207031 183.40625 207.113281 C 188.207031 202.804688 192.808594 198.800781 197.308594 195.042969 C 210.867188 183.6875 223.550781 174.328125 238.558594 163.890625 C 244.550781 159.726562 250.910156 155.390625 257.839844 150.683594 C 263.898438 130.472656 259.238281 108.054688 243.679688 92.507812 C 228.113281 76.960938 205.675781 72.308594 185.445312 78.359375 Z M 218.878906 44.636719 L 218.875 44.644531 C 214.050781 45.765625 208.640625 46.460938 204.863281 49.796875 C 198.296875 55.605469 194.359375 62.769531 190.695312 69.441406 C 212.003906 65.566406 233.78125 72.0625 248.960938 87.230469 C 264.140625 102.394531 270.644531 124.144531 266.765625 145.433594 C 273.441406 141.769531 280.613281 137.84375 286.425781 131.285156 C 289.769531 127.507812 290.460938 122.105469 291.585938 117.285156 L 291.59375 117.28125 C 296.195312 97.570312 290.851562 76.035156 275.507812 60.707031 C 260.164062 45.378906 238.617188 40.046875 218.878906 44.636719 Z M 92.039062 244 C 81.242188 233.214844 78.21875 216.195312 83.246094 198.289062 C 79.15625 201.832031 75.148438 205.761719 71.992188 210.734375 C 65.054688 221.703125 67.738281 235.386719 72.027344 245.507812 C 73.777344 249.617188 76.234375 253.367188 79.449219 256.578125 C 82.667969 259.792969 86.417969 262.25 90.535156 263.996094 C 100.660156 268.277344 114.359375 270.957031 125.335938 264.027344 C 130.316406 260.875 134.25 256.875 137.796875 252.785156 C 119.871094 257.8125 102.835938 254.789062 92.039062 244 Z M 106.777344 165.558594 C 109.175781 163.070312 111.457031 160.660156 113.671875 158.316406 C 115.144531 156.746094 116.617188 155.167969 118.035156 153.621094 C 118.878906 152.710938 119.683594 151.839844 120.46875 150.980469 L 123.417969 147.71875 C 126.300781 144.511719 128.945312 141.507812 131.476562 138.554688 C 127.71875 137.328125 123.425781 138.195312 120.4375 141.183594 L 108.574219 153.035156 C 105.136719 156.46875 104.503906 161.617188 106.636719 165.703125 Z M 334.8125 60.226562 C 333.46875 58.882812 331.191406 58.972656 329.730469 60.429688 L 319.433594 70.722656 C 319.433594 70.722656 319.433594 70.722656 319.429688 70.722656 L 314.503906 65.800781 L 314.507812 65.800781 L 324.808594 55.511719 C 326.265625 54.050781 326.355469 51.78125 325.007812 50.433594 C 323.664062 49.085938 321.386719 49.175781 319.925781 50.636719 L 309.628906 60.925781 C 309.628906 60.925781 309.625 60.925781 309.625 60.925781 L 304.699219 56.007812 C 304.703125 56.003906 304.703125 56.003906 304.703125 56.003906 L 315.003906 45.714844 C 316.460938 44.257812 316.554688 41.984375 315.207031 40.636719 C 313.859375 39.292969 311.582031 39.382812 310.125 40.839844 L 299.824219 51.128906 L 299.820312 51.132812 L 294.898438 46.210938 L 305.199219 35.917969 C 306.65625 34.460938 306.75 32.1875 305.402344 30.84375 C 304.054688 29.496094 301.777344 29.585938 300.320312 31.042969 L 290.019531 41.335938 L 285.09375 36.417969 L 285.09375 36.414062 L 295.394531 26.125 C 296.851562 24.667969 296.945312 22.394531 295.597656 21.046875 C 294.25 19.703125 291.972656 19.792969 290.515625 21.25 L 280.214844 31.542969 L 275.289062 26.621094 L 285.589844 16.328125 C 287.046875 14.875 287.140625 12.597656 285.792969 11.253906 C 284.445312 9.90625 282.167969 9.996094 280.710938 11.453125 L 270.410156 21.746094 L 265.484375 16.824219 L 275.785156 6.535156 C 277.242188 5.078125 277.335938 2.804688 275.988281 1.457031 C 274.640625 0.113281 272.363281 0.203125 270.90625 1.660156 L 260.605469 11.949219 C 260.601562 11.953125 260.601562 11.957031 260.597656 11.960938 L 230.417969 35.601562 C 249.109375 34.921875 267.269531 41.917969 280.792969 55.429688 C 294.320312 68.941406 301.320312 87.082031 300.640625 105.75 L 324.292969 75.609375 C 324.300781 75.605469 324.304688 75.601562 324.3125 75.597656 L 334.613281 65.308594 C 336.070312 63.847656 336.160156 61.574219 334.8125 60.226562 Z M 64.828125 316.371094 C 56.300781 312.417969 48.933594 309.003906 48.019531 303.84375 C 47.019531 298.210938 52.90625 288.792969 65.5 275.832031 L 72.09375 282.417969 L 84.921875 269.605469 C 80.898438 267.570312 77.289062 264.980469 74.164062 261.859375 C 71.039062 258.738281 68.445312 255.128906 66.410156 251.113281 L 53.585938 263.929688 L 60.214844 270.554688 C 45.214844 285.964844 39.160156 296.699219 40.660156 305.144531 C 42.257812 314.140625 51.691406 318.515625 61.683594 323.144531 C 78.3125 330.855469 97.15625 339.585938 93.015625 370.402344 C 92.855469 371.605469 93.28125 372.746094 94.078125 373.542969 C 94.636719 374.101562 95.378906 374.488281 96.222656 374.601562 C 98.265625 374.875 100.148438 373.441406 100.421875 371.398438 C 105.296875 335.128906 81.910156 324.289062 64.828125 316.371094 Z" />
    </svg>
  );
}

// Icon mapping for settings
const iconMap = {
  "map-pin": MapPin,
  pencil: Pencil,
  thermometer: Thermometer,
  wind: Wind,
  rain: CloudRain,
  running: Zap,
  sliders: SlidersHorizontal,
  bell: Bell,
  warning: AlertTriangle,
  calendar: Calendar,
  chart: BarChart3,
  clock: Clock,
  save: Save,
  download: Download,
  trash: Trash2,
  heart: Heart,
  elderly: User,
  weight: Scale,
  coat: Menu,
  snowflake: Snowflake,
};

function Icon({ name, className = "w-5 h-5" }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

// Toggle Component
function Toggle({ active, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors ${active ? 'bg-[#9CAF88]' : 'bg-gray-300'}`}
    >
      <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${active ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );
}

// Settings Section Component
function SettingsSection({ title, description, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[rgba(139,69,19,0.15)] mb-6">
      <div className="mb-4 pb-4 border-b border-[rgba(139,69,19,0.15)]">
        <h2 className="font-display text-xl font-semibold text-[#5C4033]">{title}</h2>
        {description && <p className="text-sm text-[#6B5344] mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

// Setting Row Component
function SettingRow({ iconName, label, description, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[rgba(139,69,19,0.1)] last:border-0">
      <div className="flex items-center gap-3">
        {iconName && (
          <span className="text-[#8B4513]">
            <Icon name={iconName} className="w-6 h-6" />
          </span>
        )}
        <div>
          <div className="font-medium text-[#2C1810]">{label}</div>
          {description && <div className="text-sm text-[#6B5344]">{description}</div>}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

// Main Settings Page
export default function Settings({ settings, setSettings, location, setLocation }) {
  const [editingLocation, setEditingLocation] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);

  const updateSettings = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const updateNotification = (key, value) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [key]: value }
    });
  };

  const handleLocationSave = () => {
    setLocation(tempLocation);
    setEditingLocation(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[#5C4033]">Settings</h1>
        <p className="text-[#6B5344] mt-1">Customize your BlanketWise experience</p>
      </div>

      {/* Location Settings */}
      <SettingsSection
        title="Location"
        description="Set your barn's location for accurate weather data"
      >
        <SettingRow
          iconName="map-pin"
          label="Current Location"
          description="Weather data is fetched for this location"
        >
          {editingLocation ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none w-48"
                placeholder="City, State"
              />
              <button
                onClick={handleLocationSave}
                className="px-4 py-2 bg-[#9CAF88] text-white rounded-lg hover:bg-[#7d9470] transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setTempLocation(location);
                  setEditingLocation(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingLocation(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#FDF8F0] text-[#8B4513] rounded-lg hover:bg-[#D4A84B]/20 transition-colors"
            >
              {location}
              <Icon name="pencil" className="w-4 h-4" />
            </button>
          )}
        </SettingRow>

        <SettingRow
          iconName="thermometer"
          label="Temperature Unit"
          description="Display temperatures in Fahrenheit or Celsius"
        >
          <select
            value={settings.tempUnit || 'fahrenheit'}
            onChange={(e) => updateSettings('tempUnit', e.target.value)}
            className="px-4 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none bg-white"
          >
            <option value="fahrenheit">Fahrenheit (°F)</option>
            <option value="celsius">Celsius (°C)</option>
          </select>
        </SettingRow>
      </SettingsSection>

      {/* Recommendation Settings */}
      <SettingsSection
        title="Recommendation Algorithm"
        description="Fine-tune how blanket recommendations are calculated"
      >
        <SettingRow
          iconName="wind"
          label="Use Feels-Like Temperature"
          description="Factor in wind chill and humidity"
        >
          <Toggle
            active={settings.useFeelsLike}
            onChange={() => updateSettings('useFeelsLike', !settings.useFeelsLike)}
          />
        </SettingRow>

        <SettingRow
          iconName="rain"
          label="Rain/Precipitation Priority"
          description="Prioritize waterproof blankets when rain is expected"
        >
          <Toggle
            active={settings.rainPriority}
            onChange={() => updateSettings('rainPriority', !settings.rainPriority)}
          />
        </SettingRow>

        <SettingRow
          iconName="running"
          label="Exercise Adjustment"
          description="Adjust recommendations based on daily exercise"
        >
          <Toggle
            active={settings.exerciseAdjustment}
            onChange={() => updateSettings('exerciseAdjustment', !settings.exerciseAdjustment)}
          />
        </SettingRow>

        <div className="py-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#8B4513]">
              <Icon name="sliders" className="w-6 h-6" />
            </span>
            <div>
              <div className="font-medium text-[#2C1810]">Temperature Buffer</div>
              <div className="text-sm text-[#6B5344]">Blanket earlier/warmer than standard recommendations</div>
            </div>
          </div>
          <div className="ml-11">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B5344]">Conservative</span>
              <span className="font-semibold text-[#8B4513]">+{settings.tempBuffer}°F</span>
              <span className="text-sm text-[#6B5344]">Aggressive</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={settings.tempBuffer}
              onChange={(e) => updateSettings('tempBuffer', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#D4A84B]"
            />
            <div className="flex justify-between text-xs text-[#6B5344] mt-1">
              <span>0°F</span>
              <span>15°F</span>
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection
        title="Notifications"
        description="Control when and how you receive alerts"
      >
        <SettingRow
          iconName="bell"
          label="Blanket Change Alerts"
          description="Get notified when recommendations change"
        >
          <Toggle
            active={settings.notifications.blanketChange}
            onChange={() => updateNotification('blanketChange', !settings.notifications.blanketChange)}
          />
        </SettingRow>

        <SettingRow
          iconName="warning"
          label="Severe Weather Alerts"
          description="Receive warnings for storms and extreme temperatures"
        >
          <Toggle
            active={settings.notifications.severeWeather}
            onChange={() => updateNotification('severeWeather', !settings.notifications.severeWeather)}
          />
        </SettingRow>

        <SettingRow
          iconName="calendar"
          label="Daily Summary"
          description="Get a morning forecast and blanket recommendation"
        >
          <Toggle
            active={settings.notifications.dailySummary}
            onChange={() => updateNotification('dailySummary', !settings.notifications.dailySummary)}
          />
        </SettingRow>

        {settings.notifications.dailySummary && (
          <div className="ml-11 mt-2 p-4 bg-[#FDF8F0] rounded-xl">
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Daily Summary Time
            </label>
            <select
              value={settings.dailySummaryTime || '6:00 AM'}
              onChange={(e) => updateSettings('dailySummaryTime', e.target.value)}
              className="px-4 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none bg-white"
            >
              <option value="5:00 AM">5:00 AM</option>
              <option value="6:00 AM">6:00 AM</option>
              <option value="7:00 AM">7:00 AM</option>
              <option value="8:00 AM">8:00 AM</option>
            </select>
          </div>
        )}
      </SettingsSection>

      {/* Display Settings */}
      <SettingsSection
        title="Display"
        description="Customize the app appearance"
      >
        <SettingRow
          iconName="chart"
          label="Show Confidence Percentage"
          description="Display confidence level on recommendations"
        >
          <Toggle
            active={settings.showConfidence !== false}
            onChange={() => updateSettings('showConfidence', settings.showConfidence === false)}
          />
        </SettingRow>

        <SettingRow
          iconName="calendar"
          label="Show 7-Day Forecast"
          description="Display extended forecast on dashboard"
        >
          <Toggle
            active={settings.showExtendedForecast !== false}
            onChange={() => updateSettings('showExtendedForecast', settings.showExtendedForecast === false)}
          />
        </SettingRow>

        <SettingRow
          iconName="clock"
          label="Show Daily Schedule"
          description="Display today's blanket schedule on dashboard"
        >
          <Toggle
            active={settings.showDailySchedule !== false}
            onChange={() => updateSettings('showDailySchedule', settings.showDailySchedule === false)}
          />
        </SettingRow>
      </SettingsSection>

      {/* Data & Privacy */}
      <SettingsSection
        title="Data & Privacy"
        description="Manage your data and account"
      >
        <SettingRow
          iconName="save"
          label="Export Data"
          description="Download all your horses and blanket data"
        >
          <button
            onClick={() => {
              alert('Export feature coming soon!');
            }}
            className="px-4 py-2 bg-[#FDF8F0] text-[#8B4513] rounded-lg hover:bg-[#D4A84B]/20 transition-colors"
          >
            Export JSON
          </button>
        </SettingRow>

        <SettingRow
          iconName="download"
          label="Import Data"
          description="Restore from a previous export"
        >
          <button
            onClick={() => {
              alert('Import feature coming soon!');
            }}
            className="px-4 py-2 bg-[#FDF8F0] text-[#8B4513] rounded-lg hover:bg-[#D4A84B]/20 transition-colors"
          >
            Import JSON
          </button>
        </SettingRow>

        <SettingRow
          iconName="trash"
          label="Reset All Data"
          description="Clear all horses, blankets, and settings"
        >
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
                alert('Reset feature coming soon!');
              }
            }}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            Reset
          </button>
        </SettingRow>
      </SettingsSection>

      {/* Blanketing Guide */}
      <SettingsSection
        title="Blanketing Guide"
        description="How recommendations are calculated"
      >
        {/* Base Thresholds */}
        <div className="mb-6">
          <h4 className="font-medium text-[#5C4033] mb-3">Base Temperature Thresholds</h4>
          <p className="text-sm text-[#6B5344] mb-3">
            For a horse with a natural winter coat, acclimated to midwest weather:
          </p>
          <div className="bg-[#FDF8F0] rounded-xl p-4 text-sm">
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">Above 40°F</span>
              <span className="font-medium text-[#5C4033]">No blanket</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">30–40°F</span>
              <span className="font-medium text-[#5C4033]">Lightweight</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">15–30°F</span>
              <span className="font-medium text-[#5C4033]">Medium weight</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">Below 15°F</span>
              <span className="font-medium text-[#5C4033]">Heavyweight</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">Below 10°F or wind &gt;20mph</span>
              <span className="font-medium text-[#5C4033]">+ Neck rug</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#6B5344]">Rain expected (any temp)</span>
              <span className="font-medium text-[#5C4033]">Waterproof / sheet</span>
            </div>
          </div>
        </div>

        {/* Horse Profile Modifiers */}
        <div className="mb-6">
          <h4 className="font-medium text-[#5C4033] mb-3">Horse Profile Modifiers</h4>
          <p className="text-sm text-[#6B5344] mb-3">
            These adjust thresholds based on your horse's profile. Positive values mean blankets are recommended at warmer temperatures.
          </p>
          <div className="space-y-3">
            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4A84B] flex items-center justify-center flex-shrink-0">
                  <ClipperIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Clipped</div>
                  <div className="text-sm text-[#6B5344]">+15°F to all thresholds</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Clipped horses lose significant natural insulation and need blankets much sooner.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center flex-shrink-0">
                  <Icon name="elderly" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Senior Horse (20+ years)</div>
                  <div className="text-sm text-[#6B5344]">+5°F to all thresholds</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Older horses may have reduced ability to regulate body temperature.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#A0522D] flex items-center justify-center flex-shrink-0">
                  <Icon name="weight" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Thin/Hard Keeper</div>
                  <div className="text-sm text-[#6B5344]">+8°F to all thresholds</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Horses below ideal weight have less body fat for insulation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coat & Tolerance Sliders */}
        <div className="mb-6">
          <h4 className="font-medium text-[#5C4033] mb-3">Coat & Tolerance Adjustments</h4>
          <div className="space-y-3">
            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6B5344] flex items-center justify-center flex-shrink-0">
                  <Icon name="coat" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Coat Growth Level</div>
                  <div className="text-sm text-[#6B5344]">-5°F to +5°F range</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Light coat adds up to +5°F (blanket sooner). Heavy coat subtracts up to 5°F (blanket later).
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5C7C9A] flex items-center justify-center flex-shrink-0">
                  <Icon name="snowflake" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Cold Tolerance</div>
                  <div className="text-sm text-[#6B5344]">-5°F to +5°F range</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Sensitive horses add up to +5°F. Hardy horses subtract up to 5°F.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Buffer */}
        <div>
          <h4 className="font-medium text-[#5C4033] mb-3">Temperature Buffer (Settings)</h4>
          <div className="bg-[#FDF8F0] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#9CAF88] flex items-center justify-center flex-shrink-0">
                <Icon name="sliders" className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-[#5C4033]">User Preference</div>
                <div className="text-sm text-[#6B5344]">0°F to +15°F (default: 0)</div>
                <div className="text-xs text-[#6B5344] mt-1">
                  Add extra degrees if you prefer more conservative (warmer) recommendations. This stacks with all other modifiers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* About */}
      <SettingsSection title="About">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-[#D4A84B] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10" viewBox="0 0 283.5 283.5" fill="none" preserveAspectRatio="xMidYMid meet">
              <path fill="#253957" d="M 262.8125 196.472656 C 258.90625 202.710938 216.382812 195.386719 182.480469 202.277344 C 148.578125 209.164062 33.691406 214.589844 27.234375 202.277344 C 21.269531 190.9375 28.265625 159.152344 24.25 146.566406 C 23.925781 145.484375 23.4375 144.507812 22.949219 143.746094 C 16.277344 134.039062 72.582031 69.054688 72.582031 69.054688 C 72.582031 69.054688 76.648438 69.488281 82.507812 72.199219 C 87.011719 74.316406 92.542969 77.789062 98.078125 83.484375 C 110.824219 96.664062 141.253906 98.617188 172.335938 89.722656 C 203.417969 80.824219 237.753906 86.898438 252.234375 105.941406 C 266.71875 124.980469 266.71875 190.179688 262.8125 196.472656 Z" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-bold text-[#5C4033]">BlanketWise</h3>
          <p className="text-[#6B5344] mt-1">Smart Horse Blanketing</p>
          <p className="text-sm text-[#6B5344] mt-4">Version 1.0.0</p>
          <p className="text-xs text-[#6B5344] mt-2 flex items-center justify-center gap-1">
            Made with <Icon name="heart" className="w-3 h-3 text-red-500" /> for horse owners everywhere
          </p>
        </div>
      </SettingsSection>
    </div>
  );
}
