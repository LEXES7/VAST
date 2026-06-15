import { z } from "zod";

/**
 * Shared types and validation schemas used by both web and api.
 * Every API boundary validates against schemas defined here.
 */

// --- Tenancy ---
export const tenantIdSchema = z.string().uuid();
export type TenantId = z.infer<typeof tenantIdSchema>;

// --- Roles (RBAC) ---
export const roleSchema = z.enum(["owner", "admin", "member", "viewer"]);
export type Role = z.infer<typeof roleSchema>;

// --- CRM: Contact ---
export const createContactSchema = z.object({
  firstName: z.string().min(1).max(120),
  lastName: z.string().max(120).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(40).optional(),
  companyId: z.string().uuid().optional(),
});
export type CreateContactInput = z.infer<typeof createContactSchema>;

// --- CRM: Deal ---
export const dealStageSchema = z.enum([
  "lead",
  "qualified",
  "proposal",
  "negotiation",
  "won",
  "lost",
]);
export type DealStage = z.infer<typeof dealStageSchema>;

export const createDealSchema = z.object({
  title: z.string().min(1).max(200),
  amount: z.number().nonnegative().default(0),
  stage: dealStageSchema.default("lead"),
  contactId: z.string().uuid().optional(),
});
export type CreateDealInput = z.infer<typeof createDealSchema>;

export const VAST = {
  name: "Vast",
  tagline: "No limits to how you grow.",
} as const;
