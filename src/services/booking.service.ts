// services/booking.service.ts

import {

  getAllBookingsRepository,

  getBookingByIdRepository,

  createBookingRepository,

  updateBookingRepository,

  deleteBookingRepository,

} from "../repositories/booking.repository";

export const getAllBookingsService = async (filters: any) => {
  return getAllBookingsRepository(filters);
};

export const getBookingByIdService =
  async (
    id: number,
  ) => {
     
    return getBookingByIdRepository(
      id,
    );
  };



export const createBookingService =
  async (
    data: any,
  ) => {

    return createBookingRepository(
      data,
    );
  };



export const updateBookingService =
  async (
    id: number,
    data: any,
  ) => {

    return updateBookingRepository(
      id,
      data,
    );
  };



export const deleteBookingService =
  async (
    id: number,
  ) => {

    return deleteBookingRepository(
      id,
    );
  };