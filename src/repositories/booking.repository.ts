// repositories/booking.repository.ts

import {
  Booking,
} from "../models/booking.model";
import { Op } from "sequelize";
import { Customer } from "../models/customer.model";

type BookingFilters = {
  page?: number;
  limit?: number;
  customerId?: number;
  paymentStatus?: string;
  bookingStatus?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
};

export const getAllBookingsRepository = async (filters: BookingFilters) => {

  const {
    page = 1,
    limit = 10,
    customerId,
    paymentStatus,
    bookingStatus,
    startDate,
    endDate,
    search,
  } = filters;

  const offset = (page - 1) * limit;

  const where: any = {};

  if (customerId) where.customer_id = customerId;

  if (paymentStatus) where.payment_status = paymentStatus;

  if (bookingStatus) where.booking_status = bookingStatus;

  if (startDate && endDate) {
    where.trip_date = {
      [Op.between]: [startDate, endDate],
    };
  }

  if (search?.trim()) {
    where[Op.or] = [
      {
        destination: {
          [Op.iLike]: `%${search}%`,
        },
      },

      {
        "$customer.name$": {
          [Op.iLike]: `%${search}%`,
        },
      },
    ];
  }

  const result = await Booking.findAndCountAll({
    where,

    include: [
      {
        model: Customer,
        as: "customer",

        attributes: [
          "id",
          "name",
          "email",
        ],

        required: false,
      },
    ],

    limit,
    offset,

    distinct: true,

    order: [
      ["created_at", "DESC"],
    ],
  });

  return {
    total: result.count,
    currentPage: page,
    totalPages: Math.ceil(result.count / limit),
    data: result.rows,
  };
};



export const getBookingByIdRepository =
  async (
    id: number,
  ) => {
   
    return Booking.findByPk(
      id,
    );
  };



export const createBookingRepository =
  async (
    data: any,
  ) => {

    return Booking.create(
      data,
    );
  };



export const updateBookingRepository =
  async (
    id: number,
    data: any,
  ) => {

    const booking =
      await Booking.findByPk(
        id,
      );

    if (!booking) {
      return null;
    }

    return booking.update(
      data,
    );
  };



export const deleteBookingRepository =
  async (
    id: number,
  ) => {

    const booking =
      await Booking.findByPk(
        id,
      );

    if (!booking) {
      return false;
    }

    await booking.destroy();

    return true;
  };