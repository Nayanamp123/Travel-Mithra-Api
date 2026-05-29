// controllers/booking.controller.ts

import {
  Request,
  Response,
} from "express";

import {

  getAllBookingsService,

  getBookingByIdService,

  createBookingService,

  updateBookingService,

  deleteBookingService,

} from "../services/booking.service";



export const getAllBookingsController = async (req: Request, res: Response) => {

  try {

    const filters = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,

      customerId: req.query.customerId
        ? Number(req.query.customerId)
        : undefined,

      paymentStatus: req.query.paymentStatus as string,

      bookingStatus: req.query.bookingStatus as string,

      startDate: req.query.startDate as string,

      endDate: req.query.endDate as string,

      search: req.query.search as string,
    };

    const bookings = await getAllBookingsService(filters);

    res.status(200).json(bookings);

  } catch(error) {

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
   console.error("Error in getAllBookingsController:", error);
  }
};



export const getBookingByIdController =
  async (
    req: Request,
    res: Response,
  ) => {

    try {

      const booking =
        await getBookingByIdService(
          Number(
            req.params.id,
          ),
        );

      if (!booking) {

        res.status(404).json({
          message:
            "Booking not found",
        });

        return;
      }

      res.status(200).json(
        booking,
      );

    } catch {

      res.status(500).json({
        message:
          "Failed to fetch booking",
      });

    }
  };



export const createBookingController =
  async (
    req: Request,
    res: Response,
  ) => {

    try {

      const booking =
        await createBookingService(
          req.body,
        );

      res.status(201).json(
        booking,
      );

    } catch {

      res.status(500).json({
        message:
          "Failed to create booking",
      });

    }
  };



export const updateBookingController =
  async (
    req: Request,
    res: Response,
  ) => {

    try {

      const booking =
        await updateBookingService(
          Number(
            req.params.id,
          ),
          req.body,
        );

      if (!booking) {

        res.status(404).json({
          message:
            "Booking not found",
        });

        return;
      }

      res.status(200).json(
        booking,
      );

    } catch {

      res.status(500).json({
        message:
          "Failed to update booking",
      });

    }
  };



export const deleteBookingController =
  async (
    req: Request,
    res: Response,
  ) => {

    try {

      const deleted =
        await deleteBookingService(
          Number(
            req.params.id,
          ),
        );

      if (!deleted) {

        res.status(404).json({
          message:
            "Booking not found",
        });

        return;
      }

      res.status(200).json({
        message:
          "Booking deleted successfully",
      });

    } catch {

      res.status(500).json({
        message:
          "Failed to delete booking",
      });

    }
  };