import { Employee } from "../models/employee.model";

export const getAllEmployeesRepo = async () => {
  return Employee.findAll();
};

export const findEmployeeByLogin = async (
  login: string,
) => {
  return Employee.findOne({
    where: {
      employeeId: login,
    },
  });
};

export const findEmployeeByEmail = async (
  email: string,
) => {
  return Employee.findOne({
    where: {
      email,
    },
  });
};

export const createEmployeeRepo = async (
  data: {
    employeeId: string;
    name: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
  },
) => {
  return Employee.create(data);
};

export const updateEmployeeRepo = async (
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
  const employee =
    await Employee.findByPk(id);

  if (!employee) {
    return null;
  }

  await employee.update(data);

  return employee;
};

export const deleteEmployeeRepo = async (
  id: number,
) => {
  const employee =
    await Employee.findByPk(id);

  if (!employee) {
    return null;
  }

  await employee.destroy();

  return true;
};