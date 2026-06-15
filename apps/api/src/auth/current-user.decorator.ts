import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import type { CurrentUser as CurrentUserType } from "./current-user";

/** Injects the verified principal into a controller method. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserType => {
    const request = ctx.switchToHttp().getRequest<Request & { user?: CurrentUserType }>();
    if (!request.user) {
      // Should never happen behind AuthGuard; fail closed if it does.
      throw new Error("CurrentUser used on a route without authentication");
    }
    return request.user;
  },
);
