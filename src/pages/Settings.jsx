import React, { useState } from 'react';

// Icon component
function Icon({ name, className = "w-5 h-5" }) {
  const icons = {
    "map-pin": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    pencil: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    thermometer: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c0 1.1.9 2 2 2s2-.9 2-2h-4zM12 3a2 2 0 00-2 2v8.26a4 4 0 102.5 6.74h.01A4 4 0 0014 13.26V5a2 2 0 00-2-2z" />
      </svg>
    ),
    wind: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
      </svg>
    ),
    rain: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13a4 4 0 004 4h9a5 5 0 00.5-9.97A5.002 5.002 0 007 7.03 4.001 4.001 0 003 13z" />
        <path strokeLinecap="round" d="M8 19v2M12 19v2M16 19v2" />
      </svg>
    ),
    running: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    sliders: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    bell: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    warning: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    calendar: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    save: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>
    ),
    download: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    trash: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    heart: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    scissors: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    elderly: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    weight: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    coat: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
    snowflake: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
      </svg>
    ),
  };
  return icons[name] || null;
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
                  <Icon name="scissors" className="w-4 h-4 text-white" />
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
