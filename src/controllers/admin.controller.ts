import { Request, Response } from "express";
import {
  loginAdminService,
  registerAdminService,
} from "../services/admin.service";
import { ADMIN_ACCESS_COOKIE } from "../utils/jwt";
import { clearCookieOptions } from "../constant/jwt.config";


export const registerAdminController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, adminId, email, password } = req.body;

    if (!name || !adminId || !email || !password) {
      res.status(400).json({
        message: "Name, admin ID, email, and password are required",
      });
      return;
    }

    const result = await registerAdminService({
      name,
      adminId,
      email,
      password,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error
        ? error.message
        : "Registration failed",
    });
  }
};

export const getAdminProfileController = (
  req: Request,
  res: Response,
) => {
  res.status(200).json({
    admin: req.admin,
  });
};

export const logoutAdminController = (
  _req: Request,
  res: Response,
) => {
  res.clearCookie(ADMIN_ACCESS_COOKIE, clearCookieOptions);
  res.status(200).json({
    message: "Logged out successfully",
  });
};
