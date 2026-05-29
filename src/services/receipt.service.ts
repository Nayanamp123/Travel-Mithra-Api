
import fs from "fs";
import path from "path";

import { Booking } from "../models/booking.model";
import { Customer } from "../models/customer.model";

import { generateReceiptPDFRepository } from "../repositories/receipt.repository";

export const generateReceiptService = async (
  bookingId: number,
) => {

  const booking: any =
    await Booking.findByPk(
      bookingId,
      {
        include: [
          {
            model: Customer,
            as: "customer",
            attributes: [
              "id",
              "name",
              "email",
            ],
          },
        ],
      },
    );

  if (!booking) {
    throw new Error(
      "Booking not found",
    );
  }

  const receiptNo =
    `TMH/${booking.id}/${new Date()
      .toLocaleDateString("en-GB")
      .replace(/\//g, "")}`;

  const currentDate =
    new Date()
      .toLocaleDateString(
        "en-GB",
      );

  const totalAmount =
    Number(
      booking.amount,
    );

  const previousPayment =
    Number(
      booking.previous_payment ||
      0,
    );

  const currentPayment =
    Number(
      booking.current_payment ||
      booking.amount,
    );

  const balanceAmount =
    totalAmount -
    previousPayment -
    currentPayment;

  const logoBase64 =
    fs.readFileSync(
      path.join(
        __dirname,
        "../assets/logo.jpeg",
      ),
      "base64",
    );

  const stampBase64 =
    fs.readFileSync(
      path.join(
        __dirname,
        "../assets/stamp.jpeg",
      ),
      "base64",
    );

  const templatePath =
    path.join(
      __dirname,
      "../assets/templates/reciept.html",
    );

  let html =
    fs.readFileSync(
      templatePath,
      "utf8",
    );

  html = html

    .replace(
      /{{receiptNo}}/g,
      receiptNo,
    )

    .replace(
      /{{currentDate}}/g,
      currentDate,
    )

    .replace(
      /{{logoBase64}}/g,
      logoBase64,
    )

    .replace(
      /{{stampBase64}}/g,
      stampBase64,
    )

    .replace(
      /{{customerName}}/g,
      booking.customer?.name ||
      "",
    )

    .replace(
      /{{destination}}/g,
      booking.destination || "",
    )

    .replace(
      /{{travellers}}/g,
      String(
        booking.number_of_travellers || 0,
      ),
    )

    .replace(
      /{{amount}}/g,
      currentPayment.toLocaleString(
        "en-IN",
      ),
    )

    .replace(
      /{{totalAmount}}/g,
      totalAmount.toLocaleString(
        "en-IN",
      ),
    )

    .replace(
      /{{previousPayment}}/g,
      previousPayment.toLocaleString(
        "en-IN",
      ),
    )

    .replace(
      /{{balanceAmount}}/g,
      balanceAmount.toLocaleString(
        "en-IN",
      ),
    );

  return generateReceiptPDFRepository(
    html,
    booking.id,
  );
};

