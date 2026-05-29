import { Router } from "express";

import {
  loginAdminController,
  registerAdminController,
  loginEmployeeController,
  loginCustomerController,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/admin/login",loginAdminController,);
authRoutes.post("/admin/register",registerAdminController);
authRoutes.post("/employee/login",loginEmployeeController);
authRoutes.post("/customer/login",loginCustomerController);
export default authRoutes;