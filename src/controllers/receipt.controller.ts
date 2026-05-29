import { Request, Response } from "express";

import { generateReceiptService } from "../services/receipt.service";

export const downloadReceiptController = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;

    const pdfPath =
      await generateReceiptService(
        Number(id)
      );

    return res.download(pdfPath);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Receipt download failed",
    });
  }
};