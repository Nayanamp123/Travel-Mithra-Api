import { Router } from "express";
import {
  getAdminProfileController,
  logoutAdminController,
  registerAdminController,
} from "../controllers/admin.controller";
import { authenticateAdmin } from "../middlewares/admin-auth.middleware";

const adminRoutes = Router();

adminRoutes.post("/register", registerAdminController);
adminRoutes.get("/me", authenticateAdmin, getAdminProfileController);
adminRoutes.post("/logout", authenticateAdmin, logoutAdminController);

export default adminRoutes;
