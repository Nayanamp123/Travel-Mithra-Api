import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Admin = sequelize.define(
  "admins",

  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    admin_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
        "admin",
        "super_admin",
      ),

      allowNull: false,

      defaultValue: "admin",
    },
  },

  {
    underscored: true,
  },
);