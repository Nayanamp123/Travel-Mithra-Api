// config/seed-customers.ts

import { Customer }
  from "../models/customer.model";

import { hashPassword }
  from "../utils/password";

export const seedDemoCustomer =
  async () => {

    const existingCustomer =
      await Customer.findOne({
        where: {
          email:
            "demo@gmail.com",
        },
      });

    if (existingCustomer) {
      return;
    }

    const password =
      await hashPassword(
        "12345",
      );

    await Customer.create({
      name: "Demo User",
      email:"demo@gmail.com",
      phone:"9876543210",
      password,
      status: "active",
    });
  };