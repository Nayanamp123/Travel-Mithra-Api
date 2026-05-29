import { Router } from "express";

import {
  getAllCustomersController,
  createCustomerController,
  updateCustomerController,
  deleteCustomerController,
  logoutCustomerController,
} from "../controllers/customer_controller";
import { authenticateAdmin } from "../middlewares/admin-auth.middleware";
import { authenticateCustomer } from "../middlewares/customer-auth.middleware";

const customerRoutes = Router();

customerRoutes.get("/",authenticateAdmin, getAllCustomersController);
customerRoutes.post("/",authenticateAdmin,createCustomerController);
customerRoutes.put("/:id",authenticateAdmin,updateCustomerController);
customerRoutes.delete("/:id",authenticateAdmin,deleteCustomerController);

customerRoutes.post("/logout", authenticateCustomer, logoutCustomerController);

export default customerRoutes;