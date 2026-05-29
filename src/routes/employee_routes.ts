import { Router } from "express";

import {
  getAllEmployeesController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
} from "../controllers/employee_controller";
import { authenticateAdmin } from "../middlewares/admin-auth.middleware";

const employeeRoutes = Router();

employeeRoutes.get("/", authenticateAdmin,getAllEmployeesController);

employeeRoutes.post("/", authenticateAdmin,createEmployeeController);

employeeRoutes.put("/:id", authenticateAdmin,updateEmployeeController);

employeeRoutes.delete("/:id", authenticateAdmin,deleteEmployeeController);

export default employeeRoutes;