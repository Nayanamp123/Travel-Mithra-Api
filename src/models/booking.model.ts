// models/booking.model.ts

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Booking = sequelize.define(
  "bookings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    trip_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    number_of_travellers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    payment_status: {
      type: DataTypes.ENUM("pending", "partial", "paid", "refunded"),
      defaultValue: "pending",
    },

    booking_status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      defaultValue: "pending",
    },
  },

  {
    underscored: true,
  },
);
