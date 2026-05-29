// controllers/auth.controller.ts

import { Request, Response }
  from "express";

import {
  loginAdminService,
  registerAdminService,
  loginEmployeeService,
  loginCustomerService,
} from "../services/auth.service";

import {
  ADMIN_ACCESS_COOKIE,
  EMPLOYEE_ACCESS_COOKIE,
  CUSTOMER_ACCESS_COOKIE,
} from "../utils/jwt";
import { authCookieOptions } from "../constant/jwt.config";



export const registerAdminController =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const {
        name,
        adminId,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !adminId ||
        !email ||
        !password
      ) {
        res.status(400).json({
          message:
            "Name, admin ID, email and password are required",
        });

        return;
      }

      const result =
        await registerAdminService({
          name,
          adminId,
          email,
          password,
        });

      res.status(201).json(result);

    } catch (error) {

      res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Admin registration failed",
      });

    }
  };



export const loginAdminController =
  async (
    req: Request,
    res: Response,
  ) => {
    try {

      const { email,password } =
        req.body;

      if (!email || !password) {

        res.status(400).json({
          message:
            "email or password are required",
        });

        return;
      }

      const result =
        await loginAdminService(
          email,
          password,
        );

      res.cookie(
        ADMIN_ACCESS_COOKIE,
        result.token,
        authCookieOptions,
      );

      res.status(200).json(
        result,
      );

    } catch (error) {

      res.status(401).json({
        message:
          error instanceof Error
            ? error.message
            : "Admin login failed",
      });

    }
  };



export const loginEmployeeController =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const login =
        req.body.employeeId ||
        req.body.email;

      const { password } =
        req.body;

      if (!login || !password) {

        res.status(400).json({
          message:
            "Employee ID or email and password are required",
        });

        return;
      }

      const result =
        await loginEmployeeService(
          login,
          password,
        );

      res.cookie(
        EMPLOYEE_ACCESS_COOKIE,
        result.token,
        authCookieOptions,
      );

      res.status(200).json(
        result,
      );

    } catch (error) {

      res.status(401).json({
        message:
          error instanceof Error
            ? error.message
            : "Employee login failed",
      });

    }
  };



export const loginCustomerController =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const {
        email,
        password,
      } = req.body;

      if (
        !email ||
        !password
      ) {

        res.status(400).json({
          message:
            "Email and password are required",
        });

        return;
      }

      const result =
        await loginCustomerService(
          email,
          password,
        );

      res.cookie(
        CUSTOMER_ACCESS_COOKIE,
        result.token,
        authCookieOptions,
      );

      res.status(200).json(
        result,
      );

    } catch (error) {

      res.status(401).json({
        message:
          error instanceof Error
            ? error.message
            : "Customer login failed",
      });

    }
  };



export const logoutAdminController = (
  _req: Request,
  res: Response,
) => {

  res.clearCookie(
    ADMIN_ACCESS_COOKIE,
    authCookieOptions,
  );

  res.status(200).json({
    message:
      "Admin logged out successfully",
  });
};



export const logoutEmployeeController = (
  _req: Request,
  res: Response,
) => {

  res.clearCookie(
    EMPLOYEE_ACCESS_COOKIE,
    authCookieOptions,
  );

  res.status(200).json({
    message:
      "Employee logged out successfully",
  });
};