// utils/jwt.ts

import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "travelmithra_secret";



export const ADMIN_ACCESS_COOKIE =
  "admin_access_token";

export const EMPLOYEE_ACCESS_COOKIE =
  "employee_access_token";

export const CUSTOMER_ACCESS_COOKIE =
  "customer_access_token";



export type JwtPayload = {
  id: number;
  email: string;
  role: string;
};



export const generateToken = (
  payload: JwtPayload,
) => {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
};



export const verifyToken = (
  token: string,
) => {
  return jwt.verify(
    token,
    JWT_SECRET,
  ) as JwtPayload;
};