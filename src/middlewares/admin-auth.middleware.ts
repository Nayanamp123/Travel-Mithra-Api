import { NextFunction, Request, Response } from "express";
import { ADMIN_ACCESS_COOKIE, JwtPayload, verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      admin?: JwtPayload;
    }
  }
}

const getCookieValue = (cookieHeader: string | undefined, cookieName: string) => {
  if (!cookieHeader) {
    return undefined;
  }

  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${cookieName}=`))
    ?.split("=")
    .slice(1)
    .join("=");
};

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookieToken = getCookieValue(req.headers.cookie, ADMIN_ACCESS_COOKIE);
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice("Bearer ".length)
    : undefined;
  const token = cookieToken || bearerToken;

  if (!token) {
    res.status(401).json({
      message: "Admin authentication token is required",
    });
    return;
  }

  try {
    const admin = verifyToken(decodeURIComponent(token));

    if (admin.role !== "admin") {
      res.status(403).json({
        message: "Admin access is required",
      });
      return;
    }

    req.admin = admin;
    next();
  } catch {
    res.status(401).json({
      message: "Invalid or expired admin token",
    });
  }
};
