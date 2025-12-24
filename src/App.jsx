import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import MyHorses from './pages/MyHorses';
import BlanketInventory from './pages/BlanketInventory';
import Settings from './pages/Settings';

// ============================================
// BLANKETWISE - HORSE BLANKET ADVISOR
// Redesigned with warm equestrian aesthetic
// ============================================

// Blanket Icon Component
function BlanketIcon({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 283.5 283.5" fill="none" preserveAspectRatio="xMidYMid meet">
      <path fill="#253957" d="M 262.8125 196.472656 C 258.90625 202.710938 216.382812 195.386719 182.480469 202.277344 C 148.578125 209.164062 33.691406 214.589844 27.234375 202.277344 C 21.269531 190.9375 28.265625 159.152344 24.25 146.566406 C 23.925781 145.484375 23.4375 144.507812 22.949219 143.746094 C 16.277344 134.039062 72.582031 69.054688 72.582031 69.054688 C 72.582031 69.054688 76.648438 69.488281 82.507812 72.199219 C 87.011719 74.316406 92.542969 77.789062 98.078125 83.484375 C 110.824219 96.664062 141.253906 98.617188 172.335938 89.722656 C 203.417969 80.824219 237.753906 86.898438 252.234375 105.941406 C 266.71875 124.980469 266.71875 190.179688 262.8125 196.472656 Z" fillOpacity="1" fillRule="nonzero"/>
      <path fill="#253957" d="M 249.632812 107.945312 C 255.328125 115.433594 259.503906 132.84375 261.132812 155.734375 C 262.597656 176.402344 261.238281 191.914062 260.101562 194.574219 C 259.777344 194.734375 258.746094 195.222656 255.707031 195.550781 C 253.15625 195.820312 249.847656 195.929688 244.914062 195.929688 C 242.09375 195.929688 238.945312 195.875 235.636719 195.875 C 231.839844 195.820312 227.878906 195.765625 223.703125 195.765625 C 211.714844 195.765625 196.148438 196.144531 181.828125 199.074219 C 162.136719 203.089844 117.0625 206.34375 81.316406 206.34375 C 34.882812 206.34375 30.273438 201.027344 30.054688 200.703125 C 27.234375 195.332031 27.832031 183.074219 28.375 172.277344 C 28.863281 161.808594 29.351562 151.882812 27.289062 145.539062" fillOpacity="1" fillRule="nonzero"/>
      <path fill="#8b9ab1" d="M 81.371094 207.15625 C 36.128906 207.15625 30.21875 202.222656 29.511719 201.191406 C 29.511719 201.136719 29.457031 201.136719 29.457031 201.082031 C 26.53125 195.550781 27.125 183.183594 27.667969 172.277344 C 28.15625 161.863281 28.644531 151.992188 26.636719 145.808594 C 26.53125 145.429688 26.746094 144.996094 27.125 144.832031 C 27.503906 144.722656 27.941406 144.941406 28.101562 145.320312 C 30.164062 151.773438 29.730469 161.757812 29.1875 172.277344 C 28.699219 182.964844 28.101562 195.0625 30.761719 200.269531 C 31.195312 200.703125 36.835938 205.585938 81.371094 205.585938 C 117.0625 205.585938 162.082031 202.328125 181.71875 198.316406 C 196.148438 195.386719 211.769531 195.007812 223.757812 195.007812 C 227.933594 195.007812 231.894531 195.0625 235.691406 195.117188 L 235.855469 195.117188 C 239.054688 195.167969 242.144531 195.167969 244.914062 195.167969 C 249.792969 195.167969 253.105469 195.0625 255.597656 194.789062 C 257.984375 194.519531 259.070312 194.195312 259.503906 194.03125 C 260.589844 190.832031 261.78125 175.640625 260.371094 155.789062 C 258.800781 133.0625 254.675781 115.757812 249.035156 108.378906 C 248.765625 108.054688 248.820312 107.566406 249.199219 107.296875 C 249.523438 107.023438 250.011719 107.132812 250.28125 107.457031 C 256.085938 115.050781 260.316406 132.628906 261.945312 155.679688 C 263.410156 176.617188 262.054688 192.132812 260.859375 194.898438 C 260.804688 195.0625 260.699219 195.167969 260.535156 195.277344 C 260.101562 195.550781 258.851562 196.039062 255.816406 196.363281 C 253.265625 196.632812 249.902344 196.742188 244.96875 196.742188 C 242.144531 196.742188 239.109375 196.6875 235.910156 196.6875 L 235.746094 196.6875 C 231.949219 196.632812 227.988281 196.582031 223.8125 196.582031 C 211.878906 196.582031 196.363281 196.960938 182.046875 199.890625 C 162.246094 203.902344 117.117188 207.15625 81.371094 207.15625 Z" fillOpacity="1" fillRule="nonzero"/>
      <path fill="#253957" d="M 82.507812 72.253906 C 81.152344 85 68.894531 104.148438 52.511719 125.035156 C 36.726562 145.15625 29.621094 147.109375 24.25 146.621094" fillOpacity="1" fillRule="nonzero"/>
      <path fill="#8b9ab1" d="M 25.445312 147.4375 C 25.011719 147.4375 24.578125 147.4375 24.195312 147.382812 C 23.761719 147.328125 23.492188 147 23.492188 146.566406 C 23.546875 146.132812 23.871094 145.863281 24.304688 145.863281 C 29.621094 146.296875 36.617188 144.019531 51.914062 124.546875 C 70.847656 100.40625 80.609375 83.265625 81.75 72.199219 C 81.804688 71.765625 82.183594 71.496094 82.5625 71.550781 C 82.996094 71.605469 83.269531 71.984375 83.214844 72.363281 C 82.019531 83.753906 72.148438 101.167969 53.054688 125.519531 C 38.515625 144.074219 31.03125 147.4375 25.445312 147.4375 Z" fillOpacity="1" fillRule="nonzero"/>
      <path fill="#253957" d="M 72.960938 69.269531 C 72.472656 73.554688 69.597656 78.765625 65.476562 85.925781 C 59.835938 95.632812 40.253906 125.414062 22.40625 141.46875" fillOpacity="1" fillRule="nonzero"/>
      <path fill="#8b9ab1" d="M 22.40625 142.226562 C 22.191406 142.226562 21.972656 142.121094 21.863281 141.957031 C 21.59375 141.632812 21.59375 141.144531 21.917969 140.871094 C 40.6875 124.058594 60.539062 92.921875 64.878906 85.488281 C 68.894531 78.546875 71.824219 73.285156 72.257812 69.109375 C 72.3125 68.675781 72.691406 68.402344 73.125 68.457031 C 73.558594 68.511719 73.828125 68.890625 73.773438 69.324219 C 73.289062 73.773438 70.304688 79.144531 66.179688 86.304688 C 59.457031 97.804688 40.089844 126.605469 22.894531 142.066406 C 22.730469 142.175781 22.570312 142.226562 22.40625 142.226562 Z" fillOpacity="1" fillRule="nonzero"/>
      <path fill="#121c2b" d="M 44.484375 162.515625 C 37.648438 162.894531 30.816406 162.785156 23.980469 162.136719 L 23.980469 156.546875 C 30.816406 157.363281 37.648438 157.523438 44.484375 157.035156 C 46.164062 156.929688 49.472656 159.640625 49.472656 159.640625 C 49.472656 159.640625 46.164062 162.40625 44.484375 162.515625 Z" fillOpacity="1" fillRule="nonzero"/>
      <path fill="#121c2b" d="M 44.484375 177.433594 C 37.648438 177.8125 30.816406 177.703125 23.980469 177.050781 L 23.980469 171.464844 C 30.816406 172.277344 37.648438 172.441406 44.484375 171.953125 C 46.164062 171.84375 49.472656 174.558594 49.472656 174.558594 C 49.472656 174.558594 46.164062 177.324219 44.484375 177.433594 Z" fillOpacity="1" fillRule="nonzero"/>
    </svg>
  );
}

// Default data
const defaultHorse = {
  id: 1,
  name: "Tucker",
  breed: "Quarter Horse",
  age: 22,
  coatGrowth: 50,
  coldTolerance: 50,
  isClipped: false,
  isSenior: true,
  isThinKeeper: false,
  shelterAccess: "run-in",
};

const defaultBlankets = [
  { id: 1, name: "Dover Heavyweight", grams: 360, waterproof: true, color: "#B8D4E3", status: "available" },
  { id: 2, name: "Rambo Medium", grams: 200, waterproof: true, color: "#D4A84B", status: "in-use" },
  { id: 3, name: "WeatherBeeta Lite", grams: 100, waterproof: false, color: "#9CAF88", status: "available" },
  { id: 4, name: "Rain Sheet", grams: 0, waterproof: true, color: "#A0522D", status: "available" },
];

const defaultWeather = {
  temp: 42,
  feelsLike: 38,
  wind: 12,
  humidity: 65,
  precipChance: 20,
  tonightLow: 28,
  condition: "partly-cloudy",
};

const defaultSettings = {
  useFeelsLike: true,
  rainPriority: true,
  exerciseAdjustment: true,
  tempBuffer: 5,
  notifications: {
    blanketChange: true,
    severeWeather: true,
    dailySummary: false,
  }
};

// ============================================
// RECOMMENDATION ENGINE
// Baseline for midwest horse with natural coat:
// - Above 40°F: No blanket (sheet if rain)
// - 30-40°F: Lightweight
// - 15-30°F: Medium
// - Below 15°F: Heavyweight
// - Strong winds or frigid temps: Add neck rug
// ============================================
function getRecommendation(weather, horse, settings, blankets) {
  const effectiveTemp = settings.useFeelsLike ? weather.feelsLike : weather.temp;

  // Base thresholds for a horse with natural coat (coatGrowth=50)
  let sheetMax = 50;   // Sheet only needed for rain above 40°F
  let lightMax = 40;   // Lightweight: 30-40°F
  let mediumMax = 30;  // Medium: 15-30°F
  let heavyMax = 15;   // Heavy: below 15°F

  // Coat adjustment: less coat = blanket at higher temps
  // At coatGrowth=0 (clipped/light): +5°F to thresholds
  // At coatGrowth=100 (very thick): -5°F to thresholds
  const coatAdjustment = (horse.coatGrowth - 50) / 10;
  lightMax -= coatAdjustment;
  mediumMax -= coatAdjustment;
  heavyMax -= coatAdjustment;

  // Tolerance adjustment: sensitive horses need blankets sooner
  const toleranceAdjustment = (horse.coldTolerance - 50) / 10;
  lightMax -= toleranceAdjustment;
  mediumMax -= toleranceAdjustment;
  heavyMax -= toleranceAdjustment;

  // Clipped horses need significantly more coverage
  if (horse.isClipped) {
    lightMax += 15;
    mediumMax += 15;
    heavyMax += 15;
  }

  // Senior horses benefit from slightly warmer coverage
  if (horse.isSenior) {
    lightMax += 5;
    mediumMax += 5;
    heavyMax += 5;
  }

  // Thin keepers need extra warmth
  if (horse.isThinKeeper) {
    lightMax += 8;
    mediumMax += 8;
    heavyMax += 8;
  }

  // User's temperature buffer preference
  lightMax += settings.tempBuffer;
  mediumMax += settings.tempBuffer;
  heavyMax += settings.tempBuffer;

  let weightNeeded = "none";
  let gramsNeeded = 0;

  if (effectiveTemp <= heavyMax) {
    weightNeeded = "heavy";
    gramsNeeded = 300;
  } else if (effectiveTemp <= mediumMax) {
    weightNeeded = "medium";
    gramsNeeded = 200;
  } else if (effectiveTemp <= lightMax) {
    weightNeeded = "light";
    gramsNeeded = 100;
  } else if (weather.precipChance > 40 && settings.rainPriority) {
    // Only recommend sheet for rain, not just cool temps
    weightNeeded = "sheet";
    gramsNeeded = 0;
  }

  const needsWaterproof = weather.precipChance > 30 && settings.rainPriority;

  // Neck rug needed for strong winds (>20mph) or frigid temps (<10°F)
  const needsNeckRug = weather.wind > 20 || effectiveTemp < 10;

  let confidence = 95;
  if (effectiveTemp > mediumMax - 3 && effectiveTemp < mediumMax + 3) confidence = 80;
  if (weather.precipChance > 50) confidence -= 5;

  let recommendedBlanket = null;
  const sortedBlankets = [...blankets].sort((a, b) => {
    const aDiff = Math.abs(a.grams - gramsNeeded);
    const bDiff = Math.abs(b.grams - gramsNeeded);
    return aDiff - bDiff;
  });

  for (const blanket of sortedBlankets) {
    if (needsWaterproof && !blanket.waterproof) continue;
    recommendedBlanket = blanket;
    break;
  }

  if (!recommendedBlanket && sortedBlankets.length > 0) {
    recommendedBlanket = sortedBlankets[0];
  }

  const reasoning = generateReasoning(weather, horse, settings, weightNeeded, effectiveTemp, needsNeckRug);

  return {
    weightNeeded,
    gramsNeeded,
    recommendedBlanket,
    confidence,
    reasoning,
    needsWaterproof,
    needsNeckRug,
    effectiveTemp,
  };
}

function generateReasoning(weather, horse, settings, weight, effectiveTemp, needsNeckRug) {
  const parts = [];

  if (settings.useFeelsLike && weather.feelsLike !== weather.temp) {
    parts.push(`With a feels-like temperature of ${effectiveTemp}°F`);
  } else {
    parts.push(`At ${effectiveTemp}°F`);
  }

  if (weather.wind > 10) {
    parts.push(`and ${weather.wind} mph winds`);
  }

  const coatLevel = horse.coatGrowth < 33 ? "light" : horse.coatGrowth < 66 ? "medium" : "heavy";
  parts.push(`${horse.name}'s ${coatLevel} winter coat provides ${coatLevel === "heavy" ? "good" : coatLevel === "medium" ? "moderate" : "minimal"} natural protection`);

  if (horse.isClipped) {
    parts.push("Since clipped, extra insulation is needed");
  }

  if (horse.isSenior) {
    parts.push("As a senior, slightly warmer coverage helps");
  }

  if (horse.isThinKeeper) {
    parts.push("Being a hard keeper, extra warmth is beneficial");
  }

  if (needsNeckRug) {
    if (weather.wind > 20) {
      parts.push("Strong winds call for a neck rug");
    } else {
      parts.push("Frigid temperatures warrant a neck rug");
    }
  }

  return parts.join(". ") + ".";
}

function getDailySchedule(weather, horse, settings, blankets) {
  const times = [
    { label: "Morning (6 AM)", icon: "🌅", temp: weather.tonightLow + 5, feelsLike: weather.tonightLow + 2 },
    { label: "Afternoon (Now)", icon: "🌤️", temp: weather.temp, feelsLike: weather.feelsLike, current: true },
    { label: "Evening (6 PM)", icon: "🌆", temp: weather.temp - 6, feelsLike: weather.feelsLike - 8 },
    { label: "Overnight", icon: "🌙", temp: weather.tonightLow, feelsLike: weather.tonightLow - 4 },
  ];
  
  return times.map(time => {
    const timeWeather = { ...weather, temp: time.temp, feelsLike: time.feelsLike };
    const rec = getRecommendation(timeWeather, horse, settings, blankets);
    return { ...time, recommendation: rec.weightNeeded };
  });
}

// ============================================
// COMPONENTS
// ============================================

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

function Slider({ value, onChange, label, valueLabel }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-[#2C1810]">{label}</span>
        <span className="text-sm font-semibold text-[#8B4513]">{valueLabel}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#D4A84B]"
      />
    </div>
  );
}

function HorseCard({ horse, isActive, onClick }) {
  const coatLevel = horse.coatGrowth < 33 ? "Light" : horse.coatGrowth < 66 ? "Medium" : "Heavy";
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl mb-3 transition-all border-2 ${
        isActive 
          ? 'border-[#8B4513] bg-white shadow-lg' 
          : 'border-transparent bg-[#FDF8F0] hover:border-[#D4A84B]'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A0522D] to-[#8B4513] flex items-center justify-center text-2xl">
          🐎
        </div>
        <div>
          <div className="font-semibold text-[#2C1810]">{horse.name}</div>
          <div className="text-sm text-[#6B5344]">{horse.breed}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-dashed border-[rgba(139,69,19,0.15)]">
        <div className="text-xs">
          <span className="text-[#6B5344]">Age: </span>
          <span className="font-medium">{horse.age} yrs</span>
        </div>
        <div className="text-xs">
          <span className="text-[#6B5344]">Coat: </span>
          <span className="font-medium">{coatLevel}</span>
        </div>
        <div className="text-xs">
          <span className="text-[#6B5344]">Body: </span>
          <span className="font-medium">{horse.isThinKeeper ? "Thin" : "Normal"}</span>
        </div>
        <div className="text-xs">
          <span className="text-[#6B5344]">Clipped: </span>
          <span className="font-medium">{horse.isClipped ? "Yes" : "No"}</span>
        </div>
      </div>
    </button>
  );
}

function WeatherBar({ weather, location }) {
  const conditionIcons = {
    "clear": "☀️",
    "partly-cloudy": "🌤️",
    "cloudy": "☁️",
    "rain": "🌧️",
    "snow": "❄️",
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 bg-white/60 rounded-xl mb-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{conditionIcons[weather.condition] || "🌤️"}</span>
          <div>
            <span className="text-2xl font-bold text-[#5C4033]">{weather.temp}°F</span>
            <span className="text-sm text-[#6B5344] ml-2">Feels like {weather.feelsLike}°F</span>
          </div>
        </div>
        <div className="h-8 w-px bg-[rgba(139,69,19,0.15)]" />
        <div className="flex items-center gap-4 text-sm text-[#6B5344]">
          <span>💨 {weather.wind} mph</span>
          <span>🌧️ {weather.precipChance}%</span>
          <span>🌙 Low {weather.tonightLow}°F</span>
        </div>
      </div>
      <div className="text-sm text-[#6B5344]">
        📍 {location}
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation, horse, currentBlanketId, setCurrentBlanketId }) {
  const weightLabels = {
    none: "No Blanket Needed",
    sheet: "Rain Sheet",
    light: "Lightweight",
    medium: "Medium Weight",
    heavy: "Heavyweight",
  };

  const weightColors = {
    none: "bg-[#9CAF88]",
    sheet: "bg-[#A0522D]",
    light: "bg-[#D4A84B]",
    medium: "bg-[#E89B3C]",
    heavy: "bg-[#5C4033]",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[rgba(139,69,19,0.1)] overflow-hidden">
      {/* Hero recommendation */}
      <div className={`${weightColors[recommendation.weightNeeded]} px-8 py-10 text-center text-white`}>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
            <BlanketIcon className="w-12 h-12" />
          </div>
        </div>
        <h2 className="font-display text-3xl font-bold mb-1">
          {weightLabels[recommendation.weightNeeded]}
        </h2>
        {recommendation.needsNeckRug && (
          <p className="text-white/90 font-medium">+ Neck Rug</p>
        )}
        <p className="text-white/75 text-sm mt-2">
          for {horse.name} • {recommendation.gramsNeeded}g fill
          {recommendation.needsWaterproof && " • Waterproof"}
        </p>
      </div>

      {/* Details section */}
      <div className="p-6">
        <p className="text-[#6B5344] leading-relaxed mb-6">{recommendation.reasoning}</p>

        {recommendation.recommendedBlanket && (
          <button
            onClick={() => setCurrentBlanketId(recommendation.recommendedBlanket.id)}
            className={`w-full py-3 rounded-xl font-medium transition-colors ${
              currentBlanketId === recommendation.recommendedBlanket.id
                ? "bg-[#9CAF88]/15 text-[#6B8E5C] border border-[#9CAF88]"
                : "bg-[#8B4513] text-white hover:bg-[#5C4033]"
            }`}
          >
            {currentBlanketId === recommendation.recommendedBlanket.id
              ? `✓ Wearing ${recommendation.recommendedBlanket.name}`
              : `Use ${recommendation.recommendedBlanket.name}`}
          </button>
        )}
      </div>
    </div>
  );
}

function DailySchedule({ schedule }) {
  const recLabels = { none: "None", sheet: "Sheet", light: "Light", medium: "Med", heavy: "Heavy" };

  return (
    <div className="bg-white rounded-xl border border-[rgba(139,69,19,0.1)] overflow-hidden">
      <div className="grid grid-cols-4 divide-x divide-[rgba(139,69,19,0.1)]">
        {schedule.map((time, i) => (
          <div
            key={i}
            className={`py-4 px-3 text-center ${time.current ? 'bg-[#D4A84B]/10' : ''}`}
          >
            <div className="text-xs text-[#6B5344] mb-1">{time.label.split(' ')[0]}</div>
            <div className="text-lg mb-1">{time.icon}</div>
            <div className="text-sm font-semibold text-[#5C4033]">{time.temp}°F</div>
            <div className="text-xs text-[#8B4513] font-medium mt-1">
              {recLabels[time.recommendation]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlanketInventoryItem({ blanket, isInUse, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 p-3 bg-[#FDF8F0] rounded-xl hover:bg-[#FDF8F0]/80 transition-colors text-left"
    >
      <div className="w-3 h-9 rounded" style={{ backgroundColor: blanket.color }} />
      <div className="flex-1">
        <div className="font-medium text-sm">{blanket.name}</div>
        <div className="text-xs text-[#6B5344]">
          {blanket.grams}g fill • {blanket.waterproof ? "Waterproof" : "Breathable"}
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded font-medium ${
        isInUse 
          ? 'bg-[#E89B3C]/20 text-[#E89B3C]' 
          : 'bg-[#9CAF88]/20 text-[#9CAF88]'
      }`}>
        {isInUse ? "In Use" : "Available"}
      </span>
    </button>
  );
}

function QuickAction({ icon, label }) {
  return (
    <button className="bg-[#FDF8F0] border border-[rgba(139,69,19,0.15)] rounded-xl p-3 text-center hover:border-[#D4A84B] hover:bg-white transition-all">
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-xs text-[#6B5344]">{label}</div>
    </button>
  );
}

function WeatherAlert({ message }) {
  return (
    <div className="bg-[#E89B3C]/10 border border-[#E89B3C]/30 rounded-xl p-4 mt-4">
      <div className="font-semibold text-[#E89B3C] flex items-center gap-2 mb-2">
        ⚠️ Weather Alert
      </div>
      <p className="text-sm text-[#2C1810]">{message}</p>
    </div>
  );
}

// ============================================
// NAVIGATION COMPONENT
// ============================================
function Navigation({ location: userLocation }) {
  const routerLocation = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "My Horses", path: "/horses" },
    { label: "Blanket Inventory", path: "/inventory" },
    { label: "Weather History", path: "/weather" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <header className="bg-gradient-to-r from-[#5C4033] to-[#8B4513] px-6 py-4 flex items-center justify-between shadow-lg">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-11 h-11 bg-[#D4A84B] rounded-full flex items-center justify-center">
          <BlanketIcon className="w-7 h-7" />
        </div>
        <span className="font-display text-2xl font-bold text-[#FDF8F0] tracking-tight">BlanketWise</span>
      </Link>

      <nav className="flex gap-8">
        {navItems.map((item) => {
          const isActive = routerLocation.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium relative transition-colors ${
                isActive
                  ? 'text-[#FDF8F0] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-[#D4A84B] after:rounded'
                  : 'text-[#FDF8F0]/80 hover:text-[#FDF8F0]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        <span className="text-[#FDF8F0]/80 text-sm">📍 {userLocation}</span>
        <div className="w-10 h-10 bg-[#D4A84B] rounded-full flex items-center justify-center font-semibold text-[#5C4033]">
          KB
        </div>
      </div>
    </header>
  );
}

// ============================================
// DASHBOARD COMPONENT
// ============================================
function Dashboard({
  horses, activeHorseId, setActiveHorseId,
  blankets, currentBlanketId, setCurrentBlanketId,
  weather, settings, location
}) {
  const activeHorse = horses.find(h => h.id === activeHorseId) || horses[0];
  const recommendation = getRecommendation(weather, activeHorse, settings, blankets);
  const schedule = getDailySchedule(weather, activeHorse, settings, blankets);

  const forecast = [
    { day: "Today", icon: "🌤️", high: 42, low: 28, rec: "Med" },
    { day: "Thu", icon: "☁️", high: 38, low: 25, rec: "Heavy" },
    { day: "Fri", icon: "🌧️", high: 45, low: 32, rec: "Med" },
    { day: "Sat", icon: "❄️", high: 30, low: 18, rec: "Heavy" },
    { day: "Sun", icon: "☀️", high: 48, low: 30, rec: "Med" },
    { day: "Mon", icon: "🌤️", high: 52, low: 35, rec: "Light" },
    { day: "Tue", icon: "☀️", high: 55, low: 38, rec: "None" },
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
                      <div className="text-lg my-1">{day.icon}</div>
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
                <span className="text-lg">⚠️</span>
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
                      <span className="text-xs text-[#9CAF88]">✓</span>
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A0522D] to-[#8B4513] flex items-center justify-center text-lg">
                  🐎
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
                {activeHorse.isClipped && <span className="px-2 py-1 bg-[#FDF8F0] rounded text-[#6B5344]">Clipped</span>}
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

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [horses, setHorses] = useState([defaultHorse]);
  const [activeHorseId, setActiveHorseId] = useState(1);
  const [blankets, setBlankets] = useState(defaultBlankets);
  const [currentBlanketId, setCurrentBlanketId] = useState(2);
  const [weather, setWeather] = useState(defaultWeather);
  const [settings, setSettings] = useState(defaultSettings);
  const [location, setLocation] = useState("Madison, WI");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FDF8F0]">
        <Navigation location={location} />

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                horses={horses}
                activeHorseId={activeHorseId}
                setActiveHorseId={setActiveHorseId}
                blankets={blankets}
                currentBlanketId={currentBlanketId}
                setCurrentBlanketId={setCurrentBlanketId}
                weather={weather}
                settings={settings}
                location={location}
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
              />
            }
          />
        </Routes>

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
