import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";

/**
 * Clerk middleware for Express, ensuring requests are authenticated.
 * You must provide the CLERK_API_KEY, CLERK_SECRET_KEY, etc. in env vars.
 */
export const requireAuth = ClerkExpressWithAuth({
  onAuthFailed: (req: Request, res: Response, _next: NextFunction) => {
    return res.status(401).json({ error: "Unauthenticated" });
  },
});