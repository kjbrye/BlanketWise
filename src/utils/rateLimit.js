/**
 * Client-side rate limiting utility
 * Prevents abuse by limiting operation frequency
 */

// Store for tracking operation timestamps
const operationTimestamps = new Map();

// Default rate limit configurations
const RATE_LIMITS = {
  // Authentication: 5 attempts per minute
  auth: { maxAttempts: 5, windowMs: 60 * 1000 },

  // Database mutations: 30 operations per minute
  mutation: { maxAttempts: 30, windowMs: 60 * 1000 },

  // Weather API: 10 requests per minute
  weather: { maxAttempts: 10, windowMs: 60 * 1000 },

  // General API calls: 60 per minute
  api: { maxAttempts: 60, windowMs: 60 * 1000 },
};

/**
 * Clean up old timestamps outside the window
 * @param {string} key - Operation key
 * @param {number} windowMs - Time window in milliseconds
 */
function cleanupTimestamps(key, windowMs) {
  const timestamps = operationTimestamps.get(key) || [];
  const now = Date.now();
  const validTimestamps = timestamps.filter(ts => now - ts < windowMs);
  operationTimestamps.set(key, validTimestamps);
  return validTimestamps;
}

/**
 * Check if an operation is allowed under rate limits
 * @param {string} operation - Operation type ('auth', 'mutation', 'weather', 'api')
 * @param {string} identifier - Unique identifier (e.g., user ID, IP)
 * @returns {{ allowed: boolean, retryAfter?: number, remaining: number }}
 */
export function checkRateLimit(operation, identifier = 'default') {
  const config = RATE_LIMITS[operation] || RATE_LIMITS.api;
  const key = `${operation}:${identifier}`;

  const timestamps = cleanupTimestamps(key, config.windowMs);
  const remaining = Math.max(0, config.maxAttempts - timestamps.length);

  if (timestamps.length >= config.maxAttempts) {
    // Calculate when the oldest timestamp will expire
    const oldestTimestamp = timestamps[0];
    const retryAfter = Math.ceil((oldestTimestamp + config.windowMs - Date.now()) / 1000);

    return {
      allowed: false,
      retryAfter,
      remaining: 0,
    };
  }

  return {
    allowed: true,
    remaining: remaining - 1, // Account for this operation
  };
}

/**
 * Record an operation for rate limiting
 * @param {string} operation - Operation type
 * @param {string} identifier - Unique identifier
 */
export function recordOperation(operation, identifier = 'default') {
  const key = `${operation}:${identifier}`;
  const timestamps = operationTimestamps.get(key) || [];
  timestamps.push(Date.now());
  operationTimestamps.set(key, timestamps);
}

/**
 * Higher-order function to wrap async operations with rate limiting
 * @param {string} operation - Operation type
 * @param {Function} fn - Async function to wrap
 * @param {string} identifier - Unique identifier
 * @returns {Function} Wrapped function
 */
export function withRateLimit(operation, fn, identifier = 'default') {
  return async (...args) => {
    const { allowed, retryAfter } = checkRateLimit(operation, identifier);

    if (!allowed) {
      throw new RateLimitError(
        `Too many requests. Please try again in ${retryAfter} seconds.`,
        retryAfter
      );
    }

    recordOperation(operation, identifier);
    return fn(...args);
  };
}

/**
 * Custom error class for rate limit violations
 */
export class RateLimitError extends Error {
  constructor(message, retryAfter) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Reset rate limit for a specific operation/identifier
 * Useful for testing or after successful authentication
 * @param {string} operation - Operation type
 * @param {string} identifier - Unique identifier
 */
export function resetRateLimit(operation, identifier = 'default') {
  const key = `${operation}:${identifier}`;
  operationTimestamps.delete(key);
}

/**
 * Get current rate limit status
 * @param {string} operation - Operation type
 * @param {string} identifier - Unique identifier
 * @returns {{ remaining: number, resetIn: number }}
 */
export function getRateLimitStatus(operation, identifier = 'default') {
  const config = RATE_LIMITS[operation] || RATE_LIMITS.api;
  const key = `${operation}:${identifier}`;

  const timestamps = cleanupTimestamps(key, config.windowMs);
  const remaining = Math.max(0, config.maxAttempts - timestamps.length);

  let resetIn = 0;
  if (timestamps.length > 0) {
    resetIn = Math.ceil((timestamps[0] + config.windowMs - Date.now()) / 1000);
  }

  return { remaining, resetIn };
}
