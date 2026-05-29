import bcrypt from "bcryptjs";

import {
  getAllEmployeesRepo,
  createEmployeeRepo,
  updateEmployeeRepo,
  deleteEmployeeRepo,
} from "../repositories/employee.repository";

export const getAllEmployeesService = async () => {
  return getAllEmployeesRepo();
};

export const createEmployeeService = async (
  employeeId: string,
  name: string,
  email: string,
  password: string,
  role: string,
  phone?: string,
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return createEmployeeRepo({
    employeeId,
    name,
    email,
    password: hashedPassword,
    role,
    phone,
  });
};

export const updateEmployeeService = async (
  id: number,
  data: {
    employeeId?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    phone?: string;
    status?: string;
  },
) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return updateEmployeeRepo(id, data);
};

export const deleteEmployeeService = async (
  id: number,
) => {
  return deleteEmployeeRepo(id);
};