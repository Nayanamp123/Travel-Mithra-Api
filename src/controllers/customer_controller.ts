import { Request, Response } from "express";

import {
  getAllCustomersService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from "../services/customer_service";
import { CUSTOMER_ACCESS_COOKIE } from "../utils/jwt";
import { authCookieOptions, clearCookieOptions } from "../constant/jwt.config";

export const getAllCustomersController = async (_req: Request,res: Response) => {
    try {
      const customers =
        await getAllCustomersService();

      res.json(customers);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch customers",
      });
    }
  };

export const createCustomerController =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const {
        name,
        email,
        phone,
        password,
      } = req.body;

      const customer =
        await createCustomerService(
          name,
          email,
          phone,
          password,
        );

      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to create customer",
      });
    }
  };

export const updateCustomerController =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const id = Number(req.params.id);

      const customer =
        await updateCustomerService(
          id,
          req.body,
        );

      if (!customer) {
        res.status(404).json({
          message:
            "Customer not found",
        });

        return;
      }

      res.json(customer);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to update customer",
      });
    }
  };

export const deleteCustomerController =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const id = Number(req.params.id);

      const deleted =
        await deleteCustomerService(id);

      if (!deleted) {
        res.status(404).json({
          message:
            "Customer not found",
        });

        return;
      }

      res.json({
        message:
          "Customer deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to delete customer",
      });
    }
  };

  export const logoutCustomerController = (
  _req: Request,
  res: Response,
) => {

  res.clearCookie(
    CUSTOMER_ACCESS_COOKIE,
    clearCookieOptions,
  );

  res.status(200).json({
    message:
      "Customer logged out successfully",
  });
};