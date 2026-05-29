import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Customer = sequelize.define("customers",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
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