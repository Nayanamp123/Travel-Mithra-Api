import fs from "fs";
import path from "path";

import { Booking } from "../models/booking.model";
import { generateReceiptPDFRepository } from "../repositories/receipt.repository";

export const generateReceiptService = async (
  bookingId: number,
) => {

  try {

    const booking: any =
      await Booking.findByPk(
        bookingId,
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
        /{{destination}}/g,
        booking.destination,
      )

      .replace(
        /{{amount}}/g,
        String(
          booking.amount,
        ),
      )

      .replace(
        /{{travellers}}/g,
        String(
          booking.number_of_travellers,
        ),
      )

      .replace(
        /{{customerName}}/g,
        booking.customer_name ||
          "",
      )

      .replace(
        /{{previousPayment}}/g,
        String(
          booking.previous_payment ||
            0,
        ),
      );



    const pdfPath =
      await generateReceiptPDFRepository(
        html,
        booking.id,
      );



    return pdfPath;

  } catch (error) {

    console.log(error);

    throw error;
  }
};