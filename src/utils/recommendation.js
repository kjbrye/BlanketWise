/**
 * Recommendation Engine
 * Baseline for midwest horse with natural coat:
 * - Above 40°F: No blanket
 * - 30-40°F: Lightweight
 * - 15-30°F: Medium weight
 * - Below 15°F: Heavyweight
 * - Below 10°F or wind >20mph: + Neck rug
 * - Rain expected (any temp): Waterproof / sheet
 */

function generateReasoning(weather, horse, settings, weight, effectiveTemp, needsNeckRug, liner = null) {
  const parts = [];
  const coatLevel = horse.coatGrowth < 33 ? "light" : horse.coatGrowth < 66 ? "medium" : "heavy";
  const coatProtection = coatLevel === "heavy" ? "excellent" : coatLevel === "medium" ? "moderate" : "minimal";

  // Weather-specific recommendation based on weight needed
  if (weight === "none") {
    if (effectiveTemp >= 60) {
      parts.push(`At ${effectiveTemp}°F, it's warm enough that ${horse.name} will be comfortable without a blanket`);
    } else if (effectiveTemp >= 50) {
      parts.push(`The mild ${effectiveTemp}°F temperature is comfortable for ${horse.name}'s ${coatLevel} coat`);
    } else {
      parts.push(`At ${effectiveTemp}°F, ${horse.name}'s ${coatLevel} winter coat provides ${coatProtection} natural insulation`);
    }
  } else if (weight === "sheet") {
    if (weather.precipChance > 40) {
      parts.push(`With ${weather.precipChance}% chance of precipitation, a rain sheet will keep ${horse.name} dry`);
    } else {
      parts.push(`A light sheet will provide just enough coverage for ${horse.name} in these conditions`);
    }
  } else if (weight === "light") {
    parts.push(`At ${effectiveTemp}°F, a lightweight blanket will supplement ${horse.name}'s natural coat`);
    if (weather.wind > 10) {
      parts.push(`The ${weather.wind} mph winds make the extra layer helpful`);
    }
  } else if (weight === "medium") {
    parts.push(`The ${effectiveTemp}°F temperature calls for medium-weight coverage`);
    if (coatLevel === "light" || horse.isClipped) {
      parts.push(`${horse.name}'s ${horse.isClipped ? "clipped coat" : "lighter coat"} needs the extra insulation`);
    } else if (weather.wind > 15) {
      parts.push(`Wind at ${weather.wind} mph makes it feel colder`);
    }
  } else if (weight === "heavy") {
    if (effectiveTemp < 10) {
      parts.push(`With temperatures at ${effectiveTemp}°F, heavyweight protection is essential for ${horse.name}`);
    } else {
      parts.push(`The cold ${effectiveTemp}°F conditions require heavyweight blanketing`);
    }
    if (weather.wind > 15) {
      parts.push(`Strong ${weather.wind} mph winds increase the chill factor`);
    }
  }

  // Add modifiers for special horse conditions
  if (horse.isClipped && weight !== "none" && weight !== "sheet") {
    parts.push("Clipped horses need extra warmth to compensate for reduced natural insulation");
  }

  if (horse.isSenior) {
    parts.push("As a senior, staying warm helps maintain comfort and health");
  }

  if (horse.isThinKeeper && weight !== "none") {
    parts.push("Extra coverage helps hard keepers conserve body heat");
  }

  if (horse.isFoal && weight !== "none") {
    parts.push("Foals under 6 months need extra warmth as their thermoregulation is still developing");
  }

  // Shelter access considerations
  if (horse.shelterAccess === "stall") {
    if (weight !== "none") {
      parts.push("Stall protection means less coverage is needed compared to turnout");
    }
  } else if (horse.shelterAccess === "none" && weight !== "none") {
    if (weather.precipChance > 15) {
      parts.push("With no shelter access, waterproof protection is especially important");
    } else if (weather.wind > 12) {
      parts.push("Without shelter, extra wind protection is needed");
    } else {
      parts.push("No shelter means extra coverage helps maintain body heat");
    }
  } else if (horse.shelterAccess === "trees" && weight !== "none") {
    if (weather.precipChance > 20) {
      parts.push("Trees provide minimal rain protection, so waterproof coverage is recommended");
    } else if (weather.wind > 15) {
      parts.push("Trees offer some wind break but additional protection helps");
    }
  }

  // Waterproof note if raining
  if (weather.precipChance > 30 && settings.rainPriority && weight !== "none") {
    parts.push("Make sure to use a waterproof option with rain in the forecast");
  }

  // Neck rug recommendation
  if (needsNeckRug) {
    if (weather.wind > 20) {
      parts.push("Add a neck rug for protection against the strong winds");
    } else {
      parts.push("A neck rug will provide extra warmth in these frigid temperatures");
    }
  }

  // Liner note
  if (liner) {
    parts.push(`The ${liner.name} adds ${liner.grams}g of extra warmth`);
  }

  return parts.join(". ") + ".";
}

/**
 * Calculate confidence percentage for a recommendation
 * Factors considered:
 * - Proximity to temperature thresholds (closer = less confident)
 * - Precipitation uncertainty (40-60% chance is most uncertain)
 * - Wind variability (high winds = more uncertainty)
 * - Blanket match quality (how close to ideal grams)
 * - Temperature stability (large temp vs feelsLike gap = variable conditions)
 */
function calculateConfidence(
  effectiveTemp,
  thresholds,
  weather,
  gramsNeeded,
  recommendedGrams,
  needsWaterproof,
  hasWaterproofMatch
) {
  let confidence = 100;

  // 1. Threshold proximity penalty (up to -20 points)
  // Check distance to each threshold boundary
  const { lightMax, mediumMax, heavyMax } = thresholds;
  const thresholdBoundaries = [lightMax, mediumMax, heavyMax];

  let minDistanceToThreshold = Infinity;
  for (const threshold of thresholdBoundaries) {
    const distance = Math.abs(effectiveTemp - threshold);
    if (distance < minDistanceToThreshold) {
      minDistanceToThreshold = distance;
    }
  }

  // Within 2°F of threshold = high uncertainty, within 5°F = moderate
  if (minDistanceToThreshold <= 2) {
    confidence -= 18;
  } else if (minDistanceToThreshold <= 4) {
    confidence -= 12;
  } else if (minDistanceToThreshold <= 6) {
    confidence -= 6;
  }

  // 2. Precipitation uncertainty penalty (up to -10 points)
  // 40-60% precipitation chance is most uncertain
  const precipChance = weather.precipChance;
  if (precipChance >= 35 && precipChance <= 65) {
    // Peak uncertainty around 50%
    const distanceFrom50 = Math.abs(precipChance - 50);
    const precipPenalty = Math.round(10 - (distanceFrom50 / 15) * 5);
    confidence -= precipPenalty;
  } else if (precipChance >= 20 && precipChance < 35) {
    confidence -= 3;
  } else if (precipChance > 65 && precipChance <= 80) {
    confidence -= 3;
  }

  // 3. Wind variability penalty (up to -8 points)
  // High winds are gusty and unpredictable
  if (weather.wind > 25) {
    confidence -= 8;
  } else if (weather.wind > 18) {
    confidence -= 5;
  } else if (weather.wind > 12) {
    confidence -= 2;
  }

  // 4. Blanket match quality penalty (up to -10 points)
  if (gramsNeeded > 0 && recommendedGrams !== null) {
    const gramsDiff = Math.abs(recommendedGrams - gramsNeeded);
    if (gramsDiff > 150) {
      confidence -= 10;
    } else if (gramsDiff > 100) {
      confidence -= 7;
    } else if (gramsDiff > 50) {
      confidence -= 4;
    } else if (gramsDiff > 25) {
      confidence -= 2;
    }
  }

  // 5. Waterproof mismatch penalty (-8 points)
  if (needsWaterproof && !hasWaterproofMatch) {
    confidence -= 8;
  }

  // 6. Temperature stability penalty (up to -6 points)
  // Large difference between actual temp and feels-like suggests variable conditions
  const tempDiff = Math.abs(weather.temp - weather.feelsLike);
  if (tempDiff > 12) {
    confidence -= 6;
  } else if (tempDiff > 8) {
    confidence -= 4;
  } else if (tempDiff > 5) {
    confidence -= 2;
  }

  // Ensure confidence stays in valid range
  return Math.max(50, Math.min(99, confidence));
}

export function getRecommendation(weather, horse, settings, blankets, liners = []) {
  const effectiveTemp = settings.useFeelsLike ? weather.feelsLike : weather.temp;

  // Base thresholds for a horse with natural coat (coatGrowth=50)
  // Using <= comparisons, so heavyMax=14 means temp < 15 triggers heavy
  let sheetMax = 50;   // Sheet only needed for rain above 40°F
  let lightMax = 40;   // Lightweight: 31-40°F (temp <= 40 and > 30)
  let mediumMax = 30;  // Medium: 15-30°F (temp <= 30 and > 14)
  let heavyMax = 14;   // Heavy: below 15°F (temp <= 14, i.e., temp < 15)

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

  // Foals (6 months and under) need significantly more warmth
  if (horse.isFoal) {
    lightMax += 10;
    mediumMax += 10;
    heavyMax += 10;
  }

  // Shelter access affects protection needs
  // Run-in is baseline (typical turnout); stall is warmest; less shelter = colder
  const shelterAdjustments = {
    stall: -8,      // Stalled horses stay much warmer - need blankets at lower temps
    'run-in': 0,    // Baseline - typical turnout situation
    trees: 3,       // Minimal protection - need blankets sooner
    none: 5,        // No protection - need blankets at higher temps
  };
  const shelterAdjustment = shelterAdjustments[horse.shelterAccess] || 0;
  lightMax += shelterAdjustment;
  mediumMax += shelterAdjustment;
  heavyMax += shelterAdjustment;

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

  // Horses without shelter are more affected by precipitation
  // Stalled horses are protected; run-in is baseline; less shelter = more sensitive
  const waterproofThresholds = {
    stall: 100,     // Stalled horses are protected from rain - effectively never
    'run-in': 30,   // Baseline threshold
    trees: 20,      // More sensitive - trees don't block rain well
    none: 15,       // Very sensitive - no protection from rain
  };
  const waterproofThreshold = waterproofThresholds[horse.shelterAccess] || 30;
  const needsWaterproof = weather.precipChance > waterproofThreshold && settings.rainPriority;

  // Neck rug needed for strong winds or frigid temps
  // Stalled horses are protected; run-in is baseline; less shelter = more sensitive
  const neckRugWindThresholds = {
    stall: 100,     // Stalled horses are protected from wind - effectively never
    'run-in': 20,   // Baseline threshold
    trees: 15,      // Trees provide some wind break
    none: 12,       // Very sensitive - no wind protection
  };
  const neckRugWindThreshold = neckRugWindThresholds[horse.shelterAccess] || 20;
  const needsNeckRug = weather.wind > neckRugWindThreshold || effectiveTemp < 10;

  let recommendedBlanket = null;
  let recommendedLiner = null;
  let combinedGrams = 0;

  // Check if liners should be included in recommendations
  const includeLiners = settings.liner?.includeInRecommendations !== false;
  const effectiveLiners = includeLiners ? liners : [];

  // Helper to get paired liner for a blanket
  const getPairedLiner = (blanketId) => effectiveLiners.find(l => l.pairedWithBlanketId === blanketId);

  // Calculate effective grams for each blanket (including paired liner if enabled)
  const blanketsWithEffectiveGrams = blankets.map(blanket => {
    const pairedLiner = getPairedLiner(blanket.id);
    const effectiveGrams = blanket.grams + (pairedLiner?.grams || 0);
    return { blanket, pairedLiner, effectiveGrams };
  });

  // Sort by closeness to gramsNeeded
  const sortedBlankets = [...blanketsWithEffectiveGrams].sort((a, b) => {
    const aDiff = Math.abs(a.effectiveGrams - gramsNeeded);
    const bDiff = Math.abs(b.effectiveGrams - gramsNeeded);
    return aDiff - bDiff;
  });

  for (const { blanket, pairedLiner, effectiveGrams } of sortedBlankets) {
    if (needsWaterproof && !blanket.waterproof) continue;
    recommendedBlanket = blanket;
    recommendedLiner = pairedLiner;
    combinedGrams = effectiveGrams;
    break;
  }

  if (!recommendedBlanket && sortedBlankets.length > 0) {
    const first = sortedBlankets[0];
    recommendedBlanket = first.blanket;
    recommendedLiner = first.pairedLiner;
    combinedGrams = first.effectiveGrams;
  }

  // Calculate confidence based on multiple factors
  const hasWaterproofMatch = !needsWaterproof || (recommendedBlanket?.waterproof ?? false);
  const confidence = calculateConfidence(
    effectiveTemp,
    { lightMax, mediumMax, heavyMax },
    weather,
    gramsNeeded,
    combinedGrams || recommendedBlanket?.grams || null,
    needsWaterproof,
    hasWaterproofMatch
  );

  const reasoning = generateReasoning(weather, horse, settings, weightNeeded, effectiveTemp, needsNeckRug, recommendedLiner);

  return {
    weightNeeded,
    gramsNeeded,
    recommendedBlanket,
    recommendedLiner,
    combinedGrams,
    confidence,
    reasoning,
    needsWaterproof,
    needsNeckRug,
    effectiveTemp,
  };
}

export function getDailySchedule(weather, horse, settings, blankets, liners = []) {
  // Determine which time block is current based on hour
  const currentHour = new Date().getHours();
  let currentBlock;
  if (currentHour >= 6 && currentHour < 12) {
    currentBlock = "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    currentBlock = "afternoon";
  } else if (currentHour >= 18 && currentHour < 21) {
    currentBlock = "evening";
  } else {
    currentBlock = "overnight";
  }

  const times = [
    { label: "Morning (6 AM)", iconType: "morning", temp: weather.tonightLow + 5, feelsLike: weather.tonightLow + 2, current: currentBlock === "morning" },
    { label: "Afternoon (12 PM)", iconType: "afternoon", temp: weather.temp, feelsLike: weather.feelsLike, current: currentBlock === "afternoon" },
    { label: "Evening (6 PM)", iconType: "evening", temp: weather.temp - 6, feelsLike: weather.feelsLike - 8, current: currentBlock === "evening" },
    { label: "Overnight", iconType: "overnight", temp: weather.tonightLow, feelsLike: weather.tonightLow - 4, current: currentBlock === "overnight" },
  ];

  return times.map(time => {
    const timeWeather = { ...weather, temp: time.temp, feelsLike: time.feelsLike };
    const rec = getRecommendation(timeWeather, horse, settings, blankets, liners);
    return { ...time, recommendation: rec.weightNeeded };
  });
}
