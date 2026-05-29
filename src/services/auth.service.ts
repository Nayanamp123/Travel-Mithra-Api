import {
  createAdmin,
  findAdminByEmail,
  findAdminByLogin,
} from "../repositories/admin.repository";

import {
  findEmployeeByEmail,
  findEmployeeByLogin,
} from "../repositories/employee.repository";

import { findCustomerByEmail } from "../repositories/customer.repository";

import { generateToken } from "../utils/jwt";

import { comparePassword, hashPassword } from "../utils/password";

export const loginAdminService = async (email: string, password: string) => {
  const admin = await findAdminByLogin(email);

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
}: {
  name: string;
  adminId: string;
  email: string;
  password: string;
}) => {
  const normalizedEmail = email.toLowerCase();

  const existingAdmin =
    (await findAdminByLogin(adminId)) ||
    (await findAdminByEmail(normalizedEmail));

  if (existingAdmin) {
    throw new Error("Admin ID or email already exists");
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

export const loginEmployeeService = async (login: string, password: string) => {
  const employee =
    (await findEmployeeByLogin(login)) ||
    (await findEmployeeByEmail(login.toLowerCase()));

  if (!employee) {
    throw new Error("Employee not found");
  }

  const isPasswordValid = await comparePassword(
    password,
    employee.getDataValue("password"),
  );

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken({
    id: employee.getDataValue("id"),
    email: employee.getDataValue("email"),
    role: employee.getDataValue("role"),
  });

  return {
    token,
    employee: {
      id: employee.getDataValue("id"),
      name: employee.getDataValue("name"),
      employeeId: employee.getDataValue("employeeId"),
      email: employee.getDataValue("email"),
      role: employee.getDataValue("role"),
    },
  };
};

export const loginCustomerService = async (email: string, password: string) => {
  const customer = await findCustomerByEmail(email.toLowerCase());

  if (!customer) {
    throw new Error("Customer not found");
  }

  const isPasswordValid = await comparePassword(
    password,
    customer.getDataValue("password"),
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const token = generateToken({
    id: customer.getDataValue("id"),
    email: customer.getDataValue("email"),
    role: "customer",
  });

  return {
    token,

    customer: {
      id: customer.getDataValue("id"),
      name: customer.getDataValue("name"),
      email: customer.getDataValue("email"),
      phone: customer.getDataValue("phone"),
      role: "customer",
    },
  };
};
