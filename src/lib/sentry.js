import * as Sentry from '@sentry/react';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

export function initSentry() {
  // Only initialize if DSN is configured
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not configured - error tracking disabled');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE, // 'development' or 'production'

    // Performance monitoring (optional - set to 0 to disable)
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 0, // 10% of transactions in prod

    // Session replay (optional - set to 0 to disable)
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: import.meta.env.PROD ? 0.1 : 0, // 10% of errors in prod

    // Filter out noisy errors
    ignoreErrors: [
      // Browser extensions
      /extensions\//i,
      /^chrome:\/\//i,
      // Network errors that aren't actionable
      'Network request failed',
      'Failed to fetch',
      'Load failed',
      // User aborted requests
      'AbortError',
    ],

    // Don't send PII
    beforeSend(event) {
      // Remove user IP address
      if (event.user) {
        delete event.user.ip_address;
      }
      return event;
    },
  });
}

// Export Sentry for manual error capture
export { Sentry };

/**
 * Capture an error manually
 * @param {Error} error - The error to capture
 * @param {object} context - Additional context
 */
export function captureError(error, context = {}) {
  if (!SENTRY_DSN) {
    console.error('Error:', error, context);
    return;
  }

  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Set user context for error tracking
 * @param {object|null} user - User object with id and email, or null to clear
 */
export function setUser(user) {
  if (!SENTRY_DSN) return;

  if (user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
    });
  } else {
    Sentry.setUser(null);
  }
}
