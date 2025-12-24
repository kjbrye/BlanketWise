export const defaultHorse = {
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

export const defaultBlankets = [
  { id: 1, name: "Dover Heavyweight", grams: 360, waterproof: true, color: "#B8D4E3", status: "available" },
  { id: 2, name: "Rambo Medium", grams: 200, waterproof: true, color: "#D4A84B", status: "in-use" },
  { id: 3, name: "WeatherBeeta Lite", grams: 100, waterproof: false, color: "#9CAF88", status: "available" },
  { id: 4, name: "Rain Sheet", grams: 0, waterproof: true, color: "#A0522D", status: "available" },
];

export const defaultWeather = {
  temp: 42,
  feelsLike: 38,
  wind: 12,
  humidity: 65,
  precipChance: 20,
  tonightLow: 28,
  condition: "partly-cloudy",
};

export const defaultSettings = {
  useFeelsLike: true,
  rainPriority: true,
  exerciseAdjustment: true,
  tempBuffer: 0,
  notifications: {
    blanketChange: true,
    severeWeather: true,
    dailySummary: false,
  }
};
