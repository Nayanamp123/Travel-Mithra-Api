import { Customer } from "../models/customer.model";

export const getAllCustomersRepo = async () => {
  return Customer.findAll();
};

export const findCustomerByEmail = async (
  email: string,
) => {
  return Customer.findOne({
    where: {
      email,
    },
  });
};

export const createCustomerRepo = async (
  data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  },
) => {
  return Customer.create(data);
};

export const updateCustomerRepo = async (
  id: number,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    passwordHash?: string;
  },
) => {
  const customer =
    await Customer.findByPk(id);

  if (!customer) {
    return null;
  }

  await customer.update(data);

  return customer;
};

export const deleteCustomerRepo = async (
  id: number,
) => {
  const customer =
    await Customer.findByPk(id);

  if (!customer) {
    return null;
  }

  await customer.destroy();

  return true;
};