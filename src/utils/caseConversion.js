/**
 * Case conversion utilities for converting between snake_case (database)
 * and camelCase (JavaScript) formats.
 */

/**
 * Convert horse from DB format (snake_case) to app format (camelCase)
 */
export function horseFromDb(dbHorse) {
  return {
    id: dbHorse.id,
    name: dbHorse.name,
    breed: dbHorse.breed,
    age: dbHorse.age,
    coatGrowth: dbHorse.coat_growth,
    coldTolerance: dbHorse.cold_tolerance,
    isClipped: dbHorse.is_clipped,
    isSenior: dbHorse.is_senior,
    isThinKeeper: dbHorse.is_thin_keeper,
    isFoal: dbHorse.is_foal,
    shelterAccess: dbHorse.shelter_access,
  };
}

/**
 * Convert horse from app format (camelCase) to DB format (snake_case)
 */
export function horseToDb(horse, userId) {
  const dbHorse = {
    user_id: userId,
    name: horse.name,
    breed: horse.breed || null,
    age: horse.age || null,
    coat_growth: horse.coatGrowth ?? 50,
    cold_tolerance: horse.coldTolerance ?? 50,
    is_clipped: horse.isClipped ?? false,
    is_senior: horse.isSenior ?? false,
    is_thin_keeper: horse.isThinKeeper ?? false,
    is_foal: horse.isFoal ?? false,
    shelter_access: horse.shelterAccess || 'run-in',
  };
  return dbHorse;
}

/**
 * Convert partial horse updates from app format to DB format
 */
export function horseUpdatesToDb(updates) {
  const dbUpdates = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.breed !== undefined) dbUpdates.breed = updates.breed;
  if (updates.age !== undefined) dbUpdates.age = updates.age;
  if (updates.coatGrowth !== undefined) dbUpdates.coat_growth = updates.coatGrowth;
  if (updates.coldTolerance !== undefined) dbUpdates.cold_tolerance = updates.coldTolerance;
  if (updates.isClipped !== undefined) dbUpdates.is_clipped = updates.isClipped;
  if (updates.isSenior !== undefined) dbUpdates.is_senior = updates.isSenior;
  if (updates.isThinKeeper !== undefined) dbUpdates.is_thin_keeper = updates.isThinKeeper;
  if (updates.isFoal !== undefined) dbUpdates.is_foal = updates.isFoal;
  if (updates.shelterAccess !== undefined) dbUpdates.shelter_access = updates.shelterAccess;
  return dbUpdates;
}

/**
 * Convert blanket from DB format to app format
 * Note: DB uses currently_on_horse_id, app uses status string
 */
export function blanketFromDb(dbBlanket) {
  return {
    id: dbBlanket.id,
    name: dbBlanket.name,
    grams: dbBlanket.grams,
    waterproof: dbBlanket.waterproof,
    color: dbBlanket.color,
    status: dbBlanket.currently_on_horse_id ? 'in-use' : 'available',
    currentlyOnHorseId: dbBlanket.currently_on_horse_id,
  };
}

/**
 * Convert blanket from app format to DB format
 */
export function blanketToDb(blanket, userId) {
  return {
    user_id: userId,
    name: blanket.name,
    grams: blanket.grams ?? 0,
    waterproof: blanket.waterproof ?? true,
    color: blanket.color || '#9CAF88',
    currently_on_horse_id: blanket.currentlyOnHorseId || null,
  };
}

/**
 * Convert partial blanket updates from app format to DB format
 */
export function blanketUpdatesToDb(updates) {
  const dbUpdates = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.grams !== undefined) dbUpdates.grams = updates.grams;
  if (updates.waterproof !== undefined) dbUpdates.waterproof = updates.waterproof;
  if (updates.color !== undefined) dbUpdates.color = updates.color;
  if (updates.currentlyOnHorseId !== undefined) {
    dbUpdates.currently_on_horse_id = updates.currentlyOnHorseId;
  }
  // Handle status change -> translate to currently_on_horse_id
  if (updates.status === 'available') {
    dbUpdates.currently_on_horse_id = null;
  }
  return dbUpdates;
}

/**
 * Convert liner from DB format to app format
 */
export function linerFromDb(dbLiner) {
  return {
    id: dbLiner.id,
    name: dbLiner.name,
    grams: dbLiner.grams,
    color: dbLiner.color,
    pairedWithBlanketId: dbLiner.paired_with_blanket_id,
  };
}

/**
 * Convert liner from app format to DB format
 */
export function linerToDb(liner, userId) {
  return {
    user_id: userId,
    name: liner.name,
    grams: liner.grams ?? 100,
    color: liner.color || '#E8D4C4',
    paired_with_blanket_id: liner.pairedWithBlanketId || null,
  };
}

/**
 * Convert partial liner updates from app format to DB format
 */
export function linerUpdatesToDb(updates) {
  const dbUpdates = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.grams !== undefined) dbUpdates.grams = updates.grams;
  if (updates.color !== undefined) dbUpdates.color = updates.color;
  if (updates.pairedWithBlanketId !== undefined) {
    dbUpdates.paired_with_blanket_id = updates.pairedWithBlanketId;
  }
  return dbUpdates;
}

/**
 * Convert settings from DB format (flattened) to app format (nested)
 */
export function settingsFromDb(dbSettings) {
  return {
    useFeelsLike: dbSettings.use_feels_like ?? true,
    rainPriority: dbSettings.rain_priority ?? true,
    tempBuffer: dbSettings.temp_buffer ?? 0,
    liner: {
      includeInRecommendations: dbSettings.liner_include_in_recommendations ?? true,
      showCombinedWeight: dbSettings.liner_show_combined_weight ?? true,
    },
    notifications: {
      blanketChange: dbSettings.notifications_blanket_change ?? true,
      severeWeather: dbSettings.notifications_severe_weather ?? true,
      dailySummary: dbSettings.notifications_daily_summary ?? false,
    },
    showConfidence: dbSettings.show_confidence ?? false,
    currentBlanketId: dbSettings.current_blanket_id ?? null,
    locationLat: dbSettings.location_lat ?? null,
    locationLng: dbSettings.location_lng ?? null,
    locationName: dbSettings.location_name ?? null,
  };
}

/**
 * Convert settings from app format (nested) to DB format (flattened)
 */
export function settingsToDb(settings) {
  return {
    use_feels_like: settings.useFeelsLike,
    rain_priority: settings.rainPriority,
    temp_buffer: settings.tempBuffer,
    liner_include_in_recommendations: settings.liner?.includeInRecommendations ?? true,
    liner_show_combined_weight: settings.liner?.showCombinedWeight ?? true,
    notifications_blanket_change: settings.notifications?.blanketChange ?? true,
    notifications_severe_weather: settings.notifications?.severeWeather ?? true,
    notifications_daily_summary: settings.notifications?.dailySummary ?? false,
    show_confidence: settings.showConfidence ?? false,
    current_blanket_id: settings.currentBlanketId ?? null,
    location_lat: settings.locationLat ?? null,
    location_lng: settings.locationLng ?? null,
    location_name: settings.locationName ?? null,
  };
}

/**
 * Convert profile from DB format to app format
 */
export function profileFromDb(dbProfile) {
  return {
    id: dbProfile.id,
    email: dbProfile.email,
    displayName: dbProfile.display_name,
    locationLat: dbProfile.location_lat,
    locationLng: dbProfile.location_lng,
    locationName: dbProfile.location_name,
  };
}
