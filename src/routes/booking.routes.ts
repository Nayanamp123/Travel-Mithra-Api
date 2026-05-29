// routes/booking.routes.ts

import {
  Router,
} from "express";

import {

  getAllBookingsController,

  getBookingByIdController,

  createBookingController,

  updateBookingController,

  deleteBookingController,

} from "../controllers/booking.controller";

import {authenticateAdmin} from "../middlewares/admin-auth.middleware";
import { authenticateCustomer } from "../middlewares/customer-auth.middleware";

const bookingRoutes = Router();

bookingRoutes.get("/",authenticateAdmin,getAllBookingsController);
bookingRoutes.get("/:id",authenticateAdmin,getBookingByIdController);
bookingRoutes.post("/",authenticateAdmin,createBookingController);
bookingRoutes.put("/:id",authenticateAdmin,updateBookingController);
bookingRoutes.delete("/:id",authenticateAdmin,deleteBookingController);

// users bookings 
bookingRoutes.get("/customer/:customerId",authenticateCustomer,getAllBookingsController);
bookingRoutes.get("/customer/:customerId/:id",authenticateCustomer,getBookingByIdController);

export default bookingRoutes;