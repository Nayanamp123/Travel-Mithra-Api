// middlewares/customer.middleware.ts

import {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  CUSTOMER_ACCESS_COOKIE,
  JwtPayload,
  verifyToken,
} from "../utils/jwt";



declare global {
  namespace Express {

    interface Request {
      customer?: JwtPayload;
    }

  }
}



const getCookieValue = (
  cookieHeader:
    string | undefined,

  cookieName: string,
) => {

  if (!cookieHeader) {
    return undefined;
  }

  return cookieHeader
    .split(";")
    .map((cookie) =>
      cookie.trim(),
    )
    .find((cookie) =>
      cookie.startsWith(
        `${cookieName}=`,
      ),
    )
    ?.split("=")
    .slice(1)
    .join("=");
};



export const authenticateCustomer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  const cookieToken =
    getCookieValue(
      req.headers.cookie,
      CUSTOMER_ACCESS_COOKIE,
    );

  const bearerToken =
    req.headers.authorization?.startsWith(
      "Bearer ",
    )
      ? req.headers.authorization.slice(
          "Bearer ".length,
        )
      : undefined;

  const token =
    cookieToken ||
    bearerToken;



  if (!token) {

    res.status(401).json({
      message:
        "Customer authentication token is required",
    });

    return;
  }



  try {

    const customer =
      verifyToken(
        decodeURIComponent(
          token,
        ),
      );



    if (
      customer.role !==
      "customer"
    ) {

      res.status(403).json({
        message:
          "Customer access is required",
      });

      return;
    }



    req.customer =
      customer;

    next();

  } catch {

    res.status(401).json({
      message:
        "Invalid or expired customer token",
    });

  }
};