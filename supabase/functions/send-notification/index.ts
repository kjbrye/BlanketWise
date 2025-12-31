// supabase/functions/send-notification/index.ts
// This function sends individual notifications via OneSignal
// Called by other functions (daily-notifications, daily-blanket-notification)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ONESIGNAL_APP_ID = Deno.env.get('ONESIGNAL_APP_ID')!
const ONESIGNAL_API_KEY = Deno.env.get('ONESIGNAL_REST_API_KEY')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface NotificationPayload {
  user_id: string
  notification: {
    title: string
    body: string
    icon?: string
    tag?: string
    data?: Record<string, unknown>
  }
}

// Validate the notification payload
function validatePayload(body: unknown): { valid: true; payload: NotificationPayload } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body is required' }
  }

  const payload = body as Record<string, unknown>

  if (!payload.user_id || typeof payload.user_id !== 'string') {
    return { valid: false, error: 'user_id is required and must be a string' }
  }

  if (!payload.notification || typeof payload.notification !== 'object') {
    return { valid: false, error: 'notification object is required' }
  }

  const notification = payload.notification as Record<string, unknown>

  if (!notification.title || typeof notification.title !== 'string') {
    return { valid: false, error: 'notification.title is required and must be a string' }
  }

  if (!notification.body || typeof notification.body !== 'string') {
    return { valid: false, error: 'notification.body is required and must be a string' }
  }

  return {
    valid: true,
    payload: {
      user_id: payload.user_id as string,
      notification: {
        title: notification.title as string,
        body: notification.body as string,
        icon: notification.icon as string | undefined,
        tag: notification.tag as string | undefined,
        data: notification.data as Record<string, unknown> | undefined,
      }
    }
  }
}

Deno.serve(async (req) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Verify authorization - only allow internal service calls
  const authHeader = req.headers.get('Authorization')
  const cronSecret = Deno.env.get('CRON_SECRET')

  if (authHeader !== `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` &&
      authHeader !== `Bearer ${cronSecret}`) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Parse and validate request body
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const validation = validatePayload(body)
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { user_id, notification } = validation.payload

    // Check if OneSignal is configured
    if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
      console.error('OneSignal not configured')
      return new Response(
        JSON.stringify({ error: 'Notification service not configured' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Send notification via OneSignal
    const oneSignalResponse = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_API_KEY}`
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        include_aliases: { external_id: [user_id] },
        target_channel: 'push',
        headings: { en: notification.title },
        contents: { en: notification.body },
        ...(notification.icon && { chrome_web_icon: notification.icon }),
        ...(notification.tag && { web_push_topic: notification.tag }),
        ...(notification.data && { data: notification.data })
      })
    })

    const result = await oneSignalResponse.json()

    if (!oneSignalResponse.ok) {
      console.error(`Failed to send notification to ${user_id}:`, JSON.stringify(result))

      // Return appropriate status based on OneSignal error
      const status = oneSignalResponse.status === 404 ? 404 : 500
      return new Response(
        JSON.stringify({
          error: 'Failed to send notification',
          details: result.errors || result
        }),
        { status, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        user_id,
        notification_id: result.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error sending notification:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
