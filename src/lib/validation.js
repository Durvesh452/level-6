import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registrationSchema = z.object({
  name: z.string().min(3, "Property name is too short").max(100, "Property name is too long"),
  location: z.string().min(2, "Location is too short").max(100, "Location is too long"),
  surveyId: z.string().optional(),
  coordinates: z.string().optional(),
});
