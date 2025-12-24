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
// ============================================
function getRecommendation(weather, horse, settings, blankets) {
  const effectiveTemp = settings.useFeelsLike ? weather.feelsLike : weather.temp;
  
  let sheetMax = 60;
  let lightMax = 45;
  let mediumMax = 32;
  let heavyMax = 20;
  
  const coatAdjustment = (horse.coatGrowth - 50) / 10;
  lightMax -= coatAdjustment;
  mediumMax -= coatAdjustment;
  heavyMax -= coatAdjustment;
  
  const toleranceAdjustment = (horse.coldTolerance - 50) / 10;
  lightMax -= toleranceAdjustment;
  mediumMax -= toleranceAdjustment;
  heavyMax -= toleranceAdjustment;
  
  if (horse.isClipped) {
    lightMax += 15;
    mediumMax += 12;
    heavyMax += 10;
  }
  
  if (horse.isSenior) {
    lightMax += 5;
    mediumMax += 5;
    heavyMax += 5;
  }
  
  if (horse.isThinKeeper) {
    lightMax += 8;
    mediumMax += 8;
    heavyMax += 8;
  }
  
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
  } else if (effectiveTemp <= sheetMax || (weather.precipChance > 40 && settings.rainPriority)) {
    weightNeeded = "sheet";
    gramsNeeded = 0;
  }
  
  const needsWaterproof = weather.precipChance > 30 && settings.rainPriority;
  
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
  
  const reasoning = generateReasoning(weather, horse, settings, weightNeeded, effectiveTemp);
  
  return {
    weightNeeded,
    gramsNeeded,
    recommendedBlanket,
    confidence,
    reasoning,
    needsWaterproof,
    effectiveTemp,
  };
}

function generateReasoning(weather, horse, settings, weight, effectiveTemp) {
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
  parts.push(`${horse.name}'s ${coatLevel} winter coat provides ${coatLevel === "heavy" ? "good" : coatLevel === "medium" ? "some" : "minimal"} natural protection`);
  
  if (weather.wind > 15) {
    parts.push("but the wind chill factor warrants additional coverage");
  }
  
  if (horse.isClipped) {
    parts.push("Since he's clipped, extra insulation is needed");
  } else if (weight !== "heavy") {
    parts.push("Since he's not clipped, a heavier blanket would risk overheating");
  }
  
  if (horse.isSenior) {
    parts.push("As a senior horse, he benefits from slightly warmer coverage");
  }
  
  return parts.join(", ") + ".";
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

function WeatherBanner({ weather, location }) {
  const conditionIcons = {
    "clear": "☀️",
    "partly-cloudy": "🌤️",
    "cloudy": "☁️",
    "rain": "🌧️",
    "snow": "❄️",
  };
  
  return (
    <div className="bg-gradient-to-r from-[#B8D4E3] to-[#E8F4F8] rounded-2xl p-6 mb-6 flex items-center justify-between relative overflow-hidden">
      <div className="absolute -top-20 -right-10 w-48 h-48 bg-white/30 rounded-full blur-2xl" />
      
      <div className="flex items-center gap-5 relative z-10">
        <div className="text-5xl">{conditionIcons[weather.condition] || "🌤️"}</div>
        <div>
          <h2 className="font-display text-4xl font-bold text-[#5C4033]">{weather.temp}°F</h2>
          <p className="text-[#6B5344]">Partly cloudy • Feels like {weather.feelsLike}°F</p>
        </div>
      </div>
      
      <div className="flex gap-8 relative z-10">
        <div className="text-center">
          <div className="text-2xl mb-1">💨</div>
          <div className="font-semibold">{weather.wind} mph</div>
          <div className="text-xs text-[#6B5344]">Wind</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">💧</div>
          <div className="font-semibold">{weather.humidity}%</div>
          <div className="text-xs text-[#6B5344]">Humidity</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">🌧️</div>
          <div className="font-semibold">{weather.precipChance}%</div>
          <div className="text-xs text-[#6B5344]">Precip</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">🌡️</div>
          <div className="font-semibold">{weather.tonightLow}°F</div>
          <div className="text-xs text-[#6B5344]">Tonight Low</div>
        </div>
      </div>
      
      <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm relative z-10 hover:shadow-md transition-shadow">
        📍 {location}
      </button>
    </div>
  );
}

function RecommendationCard({ recommendation, horse, currentBlanketId, setCurrentBlanketId }) {
  const weightLabels = {
    none: "No Blanket",
    sheet: "Rain Sheet",
    light: "Lightweight Blanket",
    medium: "Medium Weight Blanket",
    heavy: "Heavy Weight Blanket",
  };
  
  const weightColors = {
    none: "from-[#9CAF88] to-[#7d9470]",
    sheet: "from-[#A0522D] to-[#8B4513]",
    light: "from-[#D4A84B] to-[#c49a3d]",
    medium: "from-[#D4A84B] to-[#E89B3C]",
    heavy: "from-[#5C4033] to-[#8B4513]",
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[rgba(139,69,19,0.15)] mb-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${weightColors[recommendation.weightNeeded]} flex items-center justify-center shadow-lg`}>
            <BlanketIcon className="w-12 h-12" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-[#5C4033]">
              {weightLabels[recommendation.weightNeeded]}
            </h3>
            <p className="text-[#6B5344]">
              {recommendation.gramsNeeded}g fill • {recommendation.needsWaterproof ? "Waterproof" : "Breathable"} turnout
            </p>
          </div>
        </div>
        <div className="bg-[#9CAF88] text-white px-4 py-2 rounded-full font-semibold text-sm">
          {recommendation.confidence}% Confidence
        </div>
      </div>
      
      <div className="bg-[#FDF8F0] rounded-xl p-4 mb-6">
        <h4 className="font-semibold flex items-center gap-2 mb-2">
          💡 Why this recommendation?
        </h4>
        <p className="text-[#6B5344] leading-relaxed">{recommendation.reasoning}</p>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[#FDF8F0] rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🌡️</div>
          <div className="text-xs text-[#6B5344] mb-1">Feels Like</div>
          <div className="font-semibold">{recommendation.effectiveTemp}°F</div>
        </div>
        <div className="bg-[#FDF8F0] rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🐴</div>
          <div className="text-xs text-[#6B5344] mb-1">Coat Level</div>
          <div className="font-semibold">{horse.coatGrowth < 33 ? "Light" : horse.coatGrowth < 66 ? "Medium" : "Heavy"}</div>
        </div>
        <div className="bg-[#FDF8F0] rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">💪</div>
          <div className="text-xs text-[#6B5344] mb-1">Exercise Today</div>
          <div className="font-semibold">Light</div>
        </div>
        <div className="bg-[#FDF8F0] rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🏠</div>
          <div className="text-xs text-[#6B5344] mb-1">Shelter</div>
          <div className="font-semibold capitalize">{horse.shelterAccess}</div>
        </div>
      </div>
      
      {recommendation.recommendedBlanket && (
        <button
          onClick={() => setCurrentBlanketId(recommendation.recommendedBlanket.id)}
          className={`w-full mt-4 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
            currentBlanketId === recommendation.recommendedBlanket.id
              ? "bg-[#9CAF88]/20 text-[#9CAF88] border-2 border-[#9CAF88]"
              : "bg-[#8B4513] text-white hover:bg-[#5C4033]"
          }`}
        >
          {currentBlanketId === recommendation.recommendedBlanket.id ? (
            <>✓ Currently Wearing {recommendation.recommendedBlanket.name}</>
          ) : (
            <>Use {recommendation.recommendedBlanket.name}</>
          )}
        </button>
      )}
    </div>
  );
}

function DailySchedule({ schedule }) {
  const recLabels = { none: "None", sheet: "Sheet", light: "Light", medium: "Medium", heavy: "Heavy" };
  
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-semibold text-[#5C4033] mb-4">Today's Blanket Schedule</h2>
      <div className="grid grid-cols-4 gap-3">
        {schedule.map((time, i) => (
          <div 
            key={i}
            className={`bg-white rounded-xl p-4 text-center border transition-all ${
              time.current ? 'border-[#D4A84B] shadow-lg shadow-[#D4A84B]/20' : 'border-[rgba(139,69,19,0.15)] hover:shadow-md'
            }`}
          >
            <div className="text-sm text-[#6B5344] mb-2">{time.label}</div>
            <div className="text-3xl mb-2">{time.icon}</div>
            <div className="text-xl font-bold text-[#5C4033] mb-2">{time.temp}°F</div>
            <div className="text-sm font-medium text-[#8B4513] bg-[#8B4513]/10 px-3 py-1 rounded-md inline-block">
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

  return (
    <>
      {/* Main Layout */}
      <div className="grid grid-cols-[1fr_320px] min-h-[calc(100vh-72px)]">
        {/* Main Content */}
        <main className="p-6 overflow-y-auto">
          <WeatherBanner weather={weather} location={location} />

          {/* Horse Selector */}
          {horses.length > 1 && (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-[#6B5344]">Showing recommendations for:</span>
              <select
                value={activeHorseId}
                onChange={(e) => setActiveHorseId(parseInt(e.target.value))}
                className="px-4 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none bg-white font-medium text-[#5C4033]"
              >
                {horses.map(horse => (
                  <option key={horse.id} value={horse.id}>{horse.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-[#5C4033]">
              Current Recommendation for {activeHorse.name}
            </h2>
            <span className="text-sm text-[#6B5344]">Updated just now</span>
          </div>

          <RecommendationCard
            recommendation={recommendation}
            horse={activeHorse}
            currentBlanketId={currentBlanketId}
            setCurrentBlanketId={setCurrentBlanketId}
          />

          <DailySchedule schedule={schedule} />

          <div>
            <h2 className="font-display text-xl font-semibold text-[#5C4033] mb-4">7-Day Forecast & Recommendations</h2>
            <div className="grid grid-cols-7 gap-2">
              {[
                { day: "Today", icon: "🌤️", high: 42, low: 28, rec: "Med → Heavy" },
                { day: "Thu", icon: "☁️", high: 38, low: 25, rec: "Heavy" },
                { day: "Fri", icon: "🌧️", high: 45, low: 32, rec: "Med WP" },
                { day: "Sat", icon: "❄️", high: 30, low: 18, rec: "Heavy+" },
                { day: "Sun", icon: "☀️", high: 48, low: 30, rec: "Medium" },
                { day: "Mon", icon: "🌤️", high: 52, low: 35, rec: "Light" },
                { day: "Tue", icon: "☀️", high: 55, low: 38, rec: "Sheet/None" },
              ].map((day, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-3 text-center border transition-all ${
                    i === 0 ? 'border-[#D4A84B] shadow-md' : 'border-[rgba(139,69,19,0.15)] hover:shadow-md'
                  }`}
                >
                  <div className="text-xs text-[#6B5344] mb-1">{day.day}</div>
                  <div className="text-2xl mb-1">{day.icon}</div>
                  <div className="text-sm font-bold text-[#5C4033]">{day.high}°/{day.low}°</div>
                  <div className="text-xs font-medium text-[#8B4513] bg-[#8B4513]/10 px-2 py-0.5 rounded mt-1 inline-block">
                    {day.rec}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="bg-white border-l border-[rgba(139,69,19,0.15)] p-5 overflow-y-auto">
          <div className="mb-6">
            <h3 className="font-display text-base font-semibold text-[#5C4033] mb-4 pb-2 border-b border-[rgba(139,69,19,0.15)]">
              Current Blanket
            </h3>
            <div className="space-y-2">
              {blankets.map(blanket => (
                <BlanketInventoryItem
                  key={blanket.id}
                  blanket={blanket}
                  isInUse={blanket.id === currentBlanketId}
                  onSelect={() => setCurrentBlanketId(blanket.id)}
                />
              ))}
            </div>
            <Link
              to="/inventory"
              className="block text-center text-sm text-[#8B4513] hover:text-[#5C4033] mt-3 transition-colors"
            >
              Manage Inventory →
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="font-display text-base font-semibold text-[#5C4033] mb-4 pb-2 border-b border-[rgba(139,69,19,0.15)]">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <QuickAction icon="📝" label="Log Blanket Change" />
              <QuickAction icon="🏋️" label="Log Exercise" />
              <QuickAction icon="📊" label="View History" />
              <QuickAction icon="🔔" label="Set Alert" />
            </div>
          </div>

          <WeatherAlert message={
            <><strong>Saturday:</strong> Significant temperature drop expected (18°F overnight low). Consider having your heavyweight blanket ready.</>
          } />

          {/* Active Horse Summary */}
          <div className="mt-6">
            <h3 className="font-display text-base font-semibold text-[#5C4033] mb-4 pb-2 border-b border-[rgba(139,69,19,0.15)]">
              {activeHorse.name}'s Profile
            </h3>
            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A0522D] to-[#8B4513] flex items-center justify-center text-2xl">
                  🐎
                </div>
                <div>
                  <div className="font-semibold text-[#2C1810]">{activeHorse.name}</div>
                  <div className="text-sm text-[#6B5344]">{activeHorse.breed}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-[#6B5344]">Age:</span> <span className="font-medium">{activeHorse.age} yrs</span></div>
                <div><span className="text-[#6B5344]">Coat:</span> <span className="font-medium">{activeHorse.coatGrowth < 33 ? "Light" : activeHorse.coatGrowth < 66 ? "Medium" : "Heavy"}</span></div>
                <div><span className="text-[#6B5344]">Clipped:</span> <span className="font-medium">{activeHorse.isClipped ? "Yes" : "No"}</span></div>
                <div><span className="text-[#6B5344]">Senior:</span> <span className="font-medium">{activeHorse.isSenior ? "Yes" : "No"}</span></div>
              </div>
              <Link
                to="/horses"
                className="block text-center text-sm text-[#8B4513] hover:text-[#5C4033] mt-3 transition-colors"
              >
                Edit Profile →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
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
