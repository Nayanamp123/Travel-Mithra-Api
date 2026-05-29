import { Request, Response } from "express";

import {
  getAllEmployeesService,
  createEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
} from "../services/employee_service";

export const getAllEmployeesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const employees =
      await getAllEmployeesService();

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
    });
  }
};

export const createEmployeeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      employeeId,
      name,
      email,
      password,
      role,
      phone,
    } = req.body;

    const employee =
      await createEmployeeService(
        employeeId,
        name,
        email,
        password,
        role || "employee",
        phone,
      );

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create employee",
    });
  }
};

export const updateEmployeeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const employee =
      await updateEmployeeService(
        id,
        req.body,
      );

    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
      });

      return;
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update employee",
    });
  }
};

export const deleteEmployeeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const deleted =
      await deleteEmployeeService(id);

    if (!deleted) {
      res.status(404).json({
        message: "Employee not found",
      });

      return;
    }

    res.json({
      message:
        "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete employee",
    });
  }
};