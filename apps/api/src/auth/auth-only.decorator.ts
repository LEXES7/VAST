import { SetMetadata } from "@nestjs/common";

export const IS_AUTH_ONLY_KEY = "isAuthOnly";

/**
 * Requires a verified session but NOT tenant membership. Used for routes a
 * logged-in user must reach before they belong to any tenant (e.g. onboarding).
 */
export const AuthOnly = () => SetMetadata(IS_AUTH_ONLY_KEY, true);
