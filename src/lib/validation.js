import { z } from 'zod';

// ===== Auth Schemas =====

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  displayName: z.string().max(100, 'Display name is too long').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// ===== Horse Schemas =====

export const horseSchema = z.object({
  name: z
    .string()
    .min(1, 'Horse name is required')
    .max(100, 'Horse name is too long')
    .trim(),
  breed: z
    .string()
    .max(100, 'Breed name is too long')
    .optional()
    .nullable(),
  age: z
    .number()
    .int('Age must be a whole number')
    .min(0, 'Age cannot be negative')
    .max(50, 'Age seems too high')
    .optional()
    .nullable(),
  coatGrowth: z
    .number()
    .min(0, 'Coat growth must be between 0 and 100')
    .max(100, 'Coat growth must be between 0 and 100')
    .optional(),
  coldTolerance: z
    .number()
    .min(0, 'Cold tolerance must be between 0 and 100')
    .max(100, 'Cold tolerance must be between 0 and 100')
    .optional(),
  isClipped: z.boolean().optional(),
  isSenior: z.boolean().optional(),
  isThinKeeper: z.boolean().optional(),
  isFoal: z.boolean().optional(),
  shelterAccess: z
    .enum(['stall', 'run-in', 'trees', 'none'])
    .optional()
    .nullable(),
});

export const horseUpdateSchema = horseSchema.partial();

// ===== Blanket Schemas =====

export const blanketSchema = z.object({
  name: z
    .string()
    .min(1, 'Blanket name is required')
    .max(100, 'Blanket name is too long')
    .trim(),
  grams: z
    .number()
    .int('Weight must be a whole number')
    .min(0, 'Weight cannot be negative')
    .max(500, 'Weight seems too high (max 500g)'),
  waterproof: z.boolean().optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color')
    .optional()
    .nullable(),
  currentlyOnHorseId: z.string().uuid().optional().nullable(),
});

export const blanketUpdateSchema = blanketSchema.partial();

// ===== Liner Schemas =====

export const linerSchema = z.object({
  name: z
    .string()
    .min(1, 'Liner name is required')
    .max(100, 'Liner name is too long')
    .trim(),
  grams: z
    .number()
    .int('Weight must be a whole number')
    .min(0, 'Weight cannot be negative')
    .max(500, 'Weight seems too high (max 500g)'),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color')
    .optional()
    .nullable(),
  pairedWithBlanketId: z.string().uuid().optional().nullable(),
});

export const linerUpdateSchema = linerSchema.partial();

// ===== Settings Schemas =====

export const coordinatesSchema = z.object({
  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});

export const settingsUpdateSchema = z.object({
  locationLat: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90')
    .optional()
    .nullable(),
  locationLng: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180')
    .optional()
    .nullable(),
  locationName: z.string().max(200).optional().nullable(),
  useFeelsLike: z.boolean().optional(),
  rainPriority: z.boolean().optional(),
  exerciseAdjustment: z.boolean().optional(),
  tempBuffer: z.number().min(0).max(15).optional(),
  showConfidence: z.boolean().optional(),
  currentBlanketId: z.string().uuid().optional().nullable(),
}).partial();

// ===== Validation Helper =====

/**
 * Validate data against a schema
 * @param {z.ZodSchema} schema - The zod schema to validate against
 * @param {unknown} data - The data to validate
 * @returns {{ success: true, data: any } | { success: false, error: string }}
 */
export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  // Get the first error message (with safe access)
  const firstError = result.error?.errors?.[0];
  return {
    success: false,
    error: firstError?.message || result.error?.message || 'Validation failed',
  };
}

/**
 * Validate and throw if invalid
 * @param {z.ZodSchema} schema - The zod schema to validate against
 * @param {unknown} data - The data to validate
 * @returns {any} The validated data
 * @throws {Error} If validation fails
 */
export function validateOrThrow(schema, data) {
  const result = validate(schema, data);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
}
