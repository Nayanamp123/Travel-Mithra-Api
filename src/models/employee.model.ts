import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Employee = sequelize.define(
  "employees",

  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(
        "employee",
        "manager",
        "supervisor",
      ),

      allowNull: false,

      defaultValue: "employee",
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "active",
        "inactive",
        "blocked",
      ),

      allowNull: false,

      defaultValue: "active",
    },
  },

  {
    underscored: true,
  },
);