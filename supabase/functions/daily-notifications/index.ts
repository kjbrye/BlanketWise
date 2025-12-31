import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT')!
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!

import webpush from 'https://esm.sh/web-push@3.6.6'

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Get users who have daily summary enabled AND have location set
    const { data: users, error: usersError } = await supabaseClient
      .from('user_settings')
      .select('user_id, location_lat, location_lng, location_name')
      .eq('notifications_daily_summary', true)
      .not('location_lat', 'is', null)
      .not('location_lng', 'is', null)

    if (usersError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch users', details: usersError }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No users with daily summary enabled and location set' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const results = []

    for (const user of users) {
      try {
        // Fetch weather for user's location
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${user.location_lat}&longitude=${user.location_lng}&current=temperature_2m,precipitation,wind_speed_10m&temperature_unit=fahrenheit`
        )
        const weather = await weatherResponse.json()

        const temp = Math.round(weather.current.temperature_2m)
        const precipitation = weather.current.precipitation
        const windSpeed = weather.current.wind_speed_10m

        // Generate blanket recommendation
        let recommendation = ''
        if (temp < 30) {
          recommendation = 'Heavy blanket recommended'
        } else if (temp < 45) {
          recommendation = 'Medium weight blanket'
        } else if (temp < 60) {
          recommendation = 'Light sheet'
        } else {
          recommendation = 'No blanket needed'
        }

        if (precipitation > 0) {
          recommendation += ' (waterproof)'
        }

        // Get user's push subscription
        const { data: subscriptions, error: subError } = await supabaseClient
          .from('push_subscriptions')
          .select('*')
          .eq('user_id', user.user_id)

        if (subError || !subscriptions || subscriptions.length === 0) {
          results.push({ user_id: user.user_id, status: 'no subscription' })
          continue
        }

        // Send notification to all user's devices
        for (const sub of subscriptions) {
          const pushSubscription = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          }

          const payload = JSON.stringify({
            title: `Good morning! It's ${temp}°F`,
            body: recommendation,
            icon: '/pwa-192x192.png',
            tag: 'daily-summary',
            data: { url: '/' }
          })

          try {
            await webpush.sendNotification(pushSubscription, payload)
            results.push({ user_id: user.user_id, status: 'sent' })
          } catch (pushError) {
            // Remove invalid subscriptions
            if (pushError.statusCode === 410 || pushError.statusCode === 404) {
              await supabaseClient
                .from('push_subscriptions')
                .delete()
                .eq('endpoint', sub.endpoint)
            }
            results.push({ user_id: user.user_id, status: 'failed', error: pushError.message })
          }
        }
      } catch (userError) {
        results.push({ user_id: user.user_id, status: 'error', error: userError.message })
      }
    }

    const sent = results.filter(r => r.status === 'sent').length

    return new Response(
      JSON.stringify({ message: `Processed ${users.length} users, sent ${sent} notifications`, results }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})