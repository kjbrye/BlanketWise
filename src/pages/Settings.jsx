import React, { useState } from 'react';

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
function SettingRow({ icon, label, description, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[rgba(139,69,19,0.1)] last:border-0">
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
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
          icon="📍"
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
              <span className="text-sm">✏️</span>
            </button>
          )}
        </SettingRow>

        <SettingRow
          icon="🌡️"
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
          icon="🌬️"
          label="Use Feels-Like Temperature"
          description="Factor in wind chill and humidity"
        >
          <Toggle
            active={settings.useFeelsLike}
            onChange={() => updateSettings('useFeelsLike', !settings.useFeelsLike)}
          />
        </SettingRow>

        <SettingRow
          icon="🌧️"
          label="Rain/Precipitation Priority"
          description="Prioritize waterproof blankets when rain is expected"
        >
          <Toggle
            active={settings.rainPriority}
            onChange={() => updateSettings('rainPriority', !settings.rainPriority)}
          />
        </SettingRow>

        <SettingRow
          icon="🏃"
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
            <span className="text-2xl">🎚️</span>
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
          icon="🔔"
          label="Blanket Change Alerts"
          description="Get notified when recommendations change"
        >
          <Toggle
            active={settings.notifications.blanketChange}
            onChange={() => updateNotification('blanketChange', !settings.notifications.blanketChange)}
          />
        </SettingRow>

        <SettingRow
          icon="⚠️"
          label="Severe Weather Alerts"
          description="Receive warnings for storms and extreme temperatures"
        >
          <Toggle
            active={settings.notifications.severeWeather}
            onChange={() => updateNotification('severeWeather', !settings.notifications.severeWeather)}
          />
        </SettingRow>

        <SettingRow
          icon="📅"
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
          icon="📊"
          label="Show Confidence Percentage"
          description="Display confidence level on recommendations"
        >
          <Toggle
            active={settings.showConfidence !== false}
            onChange={() => updateSettings('showConfidence', settings.showConfidence === false)}
          />
        </SettingRow>

        <SettingRow
          icon="📅"
          label="Show 7-Day Forecast"
          description="Display extended forecast on dashboard"
        >
          <Toggle
            active={settings.showExtendedForecast !== false}
            onChange={() => updateSettings('showExtendedForecast', settings.showExtendedForecast === false)}
          />
        </SettingRow>

        <SettingRow
          icon="🕐"
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
          icon="💾"
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
          icon="📥"
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
          icon="🗑️"
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
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243z" />
                  </svg>
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
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
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
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
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
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
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
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
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
          <p className="text-xs text-[#6B5344] mt-2">
            Made with ❤️ for horse owners everywhere
          </p>
        </div>
      </SettingsSection>
    </div>
  );
}
