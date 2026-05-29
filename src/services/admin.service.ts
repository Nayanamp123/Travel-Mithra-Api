import {
  createAdmin,
  findAdminByEmail,
  findAdminByLogin,
} from "../repositories/admin.repository";
import { CreateAdminInput } from "../types/admin.types";
import { demoAdmins } from "../config/demo-admins";
import { getDatabaseStatus } from "../config/db";

import { generateToken } from "../utils/jwt";

import { comparePassword, hashPassword } from "../utils/password";

const runtimeAdmins: Array<{
  id: number;
  name: string;
  adminId: string;
  email: string;
  passwordHash: string;
  role: string;
}> = [];

const findRuntimeAdmin = (login: string) =>
  runtimeAdmins.find((admin) => admin.adminId === login || admin.email === login.toLowerCase());

const findDemoAdmin = (login: string) =>
  demoAdmins.find((admin) => admin.adminId === login || admin.email === login.toLowerCase());

export const loginAdminService = async (
  login: string,
  password: string,
) => {
  if (!getDatabaseStatus()) {
    const runtimeAdmin = findRuntimeAdmin(login);

    if (runtimeAdmin) {
      const isPasswordValid = await comparePassword(password, runtimeAdmin.passwordHash);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = generateToken({
        id: runtimeAdmin.id,
        email: runtimeAdmin.email,
        role: runtimeAdmin.role,
      });

      return {
        token,
        admin: {
          id: runtimeAdmin.id,
          name: runtimeAdmin.name,
          adminId: runtimeAdmin.adminId,
          email: runtimeAdmin.email,
          role: runtimeAdmin.role,
        },
      };
    }

    const demoAdmin = findDemoAdmin(login);

    if (!demoAdmin || demoAdmin.password !== password) {
      throw new Error("Invalid login details");
    }

    const token = generateToken({
      id: demoAdmins.indexOf(demoAdmin) + 1,
      email: demoAdmin.email,
      role: "admin",
    });

    return {
      token,
      admin: {
        id: demoAdmins.indexOf(demoAdmin) + 1,
        name: demoAdmin.name,
        adminId: demoAdmin.adminId,
        email: demoAdmin.email,
        role: "admin",
      },
    };
  }

  const admin = await findAdminByLogin(login);

  if (!admin) {
    throw new Error("Admin not found");
  }

  const isPasswordValid = await comparePassword(
    password,
    admin.getDataValue("password"),
  );

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken({
    id: admin.getDataValue("id"),
    email: admin.getDataValue("email"),
    role: admin.getDataValue("role"),
  });

  return {
    token,
    admin: {
      id: admin.getDataValue("id"),
      name: admin.getDataValue("name"),
      adminId: admin.getDataValue("adminId"),
      email: admin.getDataValue("email"),
      role: admin.getDataValue("role"),
    },
  };
};

export const registerAdminService = async ({
  name,
  adminId,
  email,
  password,
}: CreateAdminInput) => {
  const normalizedEmail = email.toLowerCase();

  if (!getDatabaseStatus()) {
    const existingAdmin = findRuntimeAdmin(adminId) || findRuntimeAdmin(normalizedEmail) || findDemoAdmin(adminId) || findDemoAdmin(normalizedEmail);

    if (existingAdmin) {
      throw new Error("Admin ID or email is already registered");
    }

    const passwordHash = await hashPassword(password);
    const admin = {
      id: runtimeAdmins.length + demoAdmins.length + 1,
      name,
      adminId,
      email: normalizedEmail,
      passwordHash,
      role: "admin",
    };

    runtimeAdmins.push(admin);

    return {
      admin: {
        id: admin.id,
        name: admin.name,
        adminId: admin.adminId,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  const existingAdmin = await findAdminByLogin(adminId) || await findAdminByEmail(normalizedEmail);

  if (existingAdmin) {
    throw new Error("Admin ID or email is already registered");
  }

  const passwordHash = await hashPassword(password);
  const admin = await createAdmin({
    name,
    adminId,
    email: normalizedEmail,
    passwordHash,
  });

  return {
    admin: {
      id: admin.getDataValue("id"),
      name: admin.getDataValue("name"),
      adminId: admin.getDataValue("adminId"),
      email: admin.getDataValue("email"),
      role: admin.getDataValue("role"),
    },
  };
};
