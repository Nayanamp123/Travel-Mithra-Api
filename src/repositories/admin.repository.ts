import { Op } from "sequelize";
import { Admin } from "../models/admin.model";
import { AdminCreateData } from "../types/admin.types";

export const findAdminByEmail = async (email: string) => {
  return Admin.findOne({
    where: { email },
  });
};

export const findAdminByLogin = async (login: string) => {
  return Admin.findOne({
    where: {
      [Op.or]: [
        { admin_id: login },
        { email: login.toLowerCase() },
      ],
    },
  });
};

export const createAdmin = async (admin: AdminCreateData) => {
  return Admin.create({
    name: admin.name,
    admin_id: admin.adminId,
    email: admin.email,
    password: admin.passwordHash,
    role: "admin",
  });
};
