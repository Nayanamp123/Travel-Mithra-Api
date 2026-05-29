import bcrypt from "bcryptjs";

import {
  getAllCustomersRepo,
  createCustomerRepo,
  updateCustomerRepo,
  deleteCustomerRepo,
} from "../repositories/customer.repository";

export const getAllCustomersService =
  async () => {
    return getAllCustomersRepo();
  };

export const createCustomerService =
  async (
    name: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    const passwordHash =
      await bcrypt.hash(password, 10);

    return createCustomerRepo({
      name,
      email,
      phone,
      password: passwordHash,
    });
  };

export const updateCustomerService =
  async (
    id: number,
    data: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
    },
  ) => {
    const updateData: {
      name?: string;
      email?: string;
      phone?: string;
      passwordHash?: string;
    } = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };

    if (data.password) {
      updateData.passwordHash =
        await bcrypt.hash(
          data.password,
          10,
        );
    }

    return updateCustomerRepo(
      id,
      updateData,
    );
  };

export const deleteCustomerService =
  async (id: number) => {
    return deleteCustomerRepo(id);
  };