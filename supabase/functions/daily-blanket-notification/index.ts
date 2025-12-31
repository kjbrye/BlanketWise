// supabase/functions/daily-blanket-notification/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ONESIGNAL_APP_ID = Deno.env.get('ONESIGNAL_APP_ID')!
const ONESIGNAL_API_KEY = Deno.env.get('ONESIGNAL_REST_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

interface Horse {
  id: string
  user_id: string
  name: string
  location_lat: number
  location_lon: number
  clip_status: string
  age_category: string
}

interface Blanket {
  id: string
  user_id: string
  name: string
  grams: number
  waterproof: boolean
}

interface WeatherData {
  temp_day: number
  temp_night: number
  wind_speed: number
  precipitation_chance: number
  conditions: string
}

// Fetch weather from Open-Meteo
async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    hourly: 'temperature_2m,precipitation_probability,wind_speed_10m,weather_code',
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    timezone: 'auto',
    forecast_days: '1'
  })

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  
  if (!response.ok) {
    throw new Error(`Open-Meteo API error: ${response.status}`)
  }
  
  const data = await response.json()
  const hourly = data.hourly

  const now = new Date()
  const currentHour = now.getHours()

  const dayTemps: number[] = []
  const nightTemps: number[] = []
  
  for (let i = 0; i < hourly.time.length; i++) {
    const hour = new Date(hourly.time[i]).getHours()
    const temp = hourly.temperature_2m[i]
    
    if (hour >= 6 && hour < 18) {
      dayTemps.push(temp)
    } else {
      nightTemps.push(temp)
    }
  }

  const avg = (arr: number[]) => arr.length > 0 
    ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) 
    : hourly.temperature_2m[currentHour] || 50

  const maxPrecipProb = Math.max(...hourly.precipitation_probability)
  const currentWind = hourly.wind_speed_10m[currentHour] || hourly.wind_speed_10m[0]
  
  const currentWeatherCode = hourly.weather_code[currentHour] || hourly.weather_code[0]
  let conditions = 'Clear'
  if (currentWeatherCode >= 51 && currentWeatherCode <= 67) conditions = 'Rain'
  else if (currentWeatherCode >= 71 && currentWeatherCode <= 77) conditions = 'Snow'
  else if (currentWeatherCode >= 80 && currentWeatherCode <= 82) conditions = 'Rain'
  else if (currentWeatherCode >= 85 && currentWeatherCode <= 86) conditions = 'Snow'
  else if (currentWeatherCode >= 95) conditions = 'Thunderstorm'
  else if (currentWeatherCode >= 45 && currentWeatherCode <= 48) conditions = 'Fog'

  return {
    temp_day: avg(dayTemps),
    temp_night: avg(nightTemps),
    wind_speed: currentWind,
    precipitation_chance: maxPrecipProb,
    conditions
  }
}

// Calculate blanket recommendation from user's actual inventory
function calculateBlanket(horse: Horse, weather: WeatherData, blankets: Blanket[]): { day: string, night: string } {
  const clipAdjustment: Record<string, number> = {
    'none': 0,
    'trace': 10,
    'blanket': 15,
    'full': 20
  }

  const ageAdjustment = horse.age_category === 'senior' ? 5 : 0
  const adjustment = (clipAdjustment[horse.clip_status] || 0) + ageAdjustment

  function getIdealGrams(temp: number): number {
    const effectiveTemp = temp - adjustment
    const windChill = weather.wind_speed > 15 ? 5 : weather.wind_speed > 10 ? 3 : 0
    const finalTemp = effectiveTemp - windChill

    if (finalTemp >= 60) return -1  // No blanket needed
    if (finalTemp >= 50) return 0   // Sheet
    if (finalTemp >= 40) return 100 // Lightweight
    if (finalTemp >= 30) return 200 // Medium
    if (finalTemp >= 20) return 350 // Heavy
    return 500 // Very heavy
  }

  function findBestBlanket(temp: number): string {
    const idealGrams = getIdealGrams(temp)
    
    // No blanket needed
    if (idealGrams === -1) return 'No blanket'
    
    // Check if rain/snow expected
    const needsWaterproof = weather.precipitation_chance > 40 || 
                           weather.conditions === 'Rain' || 
                           weather.conditions === 'Snow'

    // Filter blankets - prefer waterproof if needed
    let candidates = [...blankets]
    
    if (needsWaterproof) {
      const waterproofBlankets = blankets.filter(b => b.waterproof)
      if (waterproofBlankets.length > 0) {
        candidates = waterproofBlankets
      }
    }

    // Sort by how close they are to ideal grams
    candidates.sort((a, b) => {
      const aDiff = Math.abs(a.grams - idealGrams)
      const bDiff = Math.abs(b.grams - idealGrams)
      return aDiff - bDiff
    })

    // Return the best match, or indicate nothing suitable
    if (candidates.length === 0) {
      return 'No suitable blanket'
    }

    const best = candidates[0]
    
    // Warn if the match is significantly off from ideal
    const diff = best.grams - idealGrams
    if (diff < -150) {
      return `${best.name} (may be too light)`
    } else if (diff > 150) {
      return `${best.name} (may be too warm)`
    }
    
    return best.name
  }

  return {
    day: findBestBlanket(weather.temp_day),
    night: findBestBlanket(weather.temp_night)
  }
}

// Send notification directly to one user
async function sendNotificationToUser(userId: string, horseName: string, dayBlanket: string, nightBlanket: string) {
  const response = await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${ONESIGNAL_API_KEY}`
    },
    body: JSON.stringify({
      app_id: ONESIGNAL_APP_ID,
      include_aliases: { external_id: [userId] },
      target_channel: 'push',
      headings: { en: `${horseName}'s Blanket Forecast 🐴` },
      contents: { en: `Day: ${dayBlanket} → Night: ${nightBlanket}` }
    })
  })

  const result = await response.json()
  
  if (!response.ok) {
    console.error(`Failed to send notification to ${userId}:`, JSON.stringify(result))
    return false
  }
  
  console.log(`Notification sent to ${userId}:`, JSON.stringify(result))
  return true
}

// Main handler
Deno.serve(async (req) => {
  const authHeader = req.headers.get('Authorization')
  const cronSecret = Deno.env.get('CRON_SECRET')
  
  if (authHeader !== `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` && 
      authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    console.log('Starting daily blanket notification job...')

    // Get all horses
    const { data: horses, error: horsesError } = await supabase
      .from('horses')
      .select('id, user_id, name, location_lat, location_lon, clip_status, age_category')

    if (horsesError) throw horsesError
    if (!horses || horses.length === 0) {
      return new Response(JSON.stringify({ message: 'No horses found' }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get all blankets
    const { data: allBlankets, error: blanketsError } = await supabase
      .from('blankets')
      .select('id, user_id, name, grams, waterproof')

    if (blanketsError) throw blanketsError

    console.log(`Processing ${horses.length} horses...`)

    let successCount = 0
    let errorCount = 0

    for (const horse of horses) {
      try {
        // Get this user's blankets
        const userBlankets = (allBlankets || []).filter(b => b.user_id === horse.user_id)
        
        // Get weather
        const weather = await fetchWeather(horse.location_lat, horse.location_lon)
        
        // Calculate recommendation using their actual blankets
        const recommendation = calculateBlanket(horse, weather, userBlankets)
        
        // Send notification directly to this user
        const success = await sendNotificationToUser(
          horse.user_id,
          horse.name,
          recommendation.day,
          recommendation.night
        )
        
        if (success) {
          successCount++
        } else {
          errorCount++
        }

        // Small delay between notifications
        await new Promise(resolve => setTimeout(resolve, 200))
        
      } catch (err) {
        console.error(`Error processing horse ${horse.name}:`, err)
        errorCount++
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        notificationsSent: successCount,
        errors: errorCount
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Job failed:', error)
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})