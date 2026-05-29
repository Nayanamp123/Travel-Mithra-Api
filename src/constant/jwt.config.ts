export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure:
    process.env.NODE_ENV ===
    "production",
  maxAge:
    24 * 60 * 60 * 1000,
};


export const clearCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure:
    process.env.NODE_ENV ===
    "production",
};