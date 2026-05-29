import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export const generateReceiptPDFRepository = async (
  html: string,
  bookingId: number
) => {
  try {

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.setContent(html);

    // CREATE UPLOAD FOLDER
    const uploadDir = path.join(
      __dirname,
      "../../uploads"
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // PDF PATH
    const pdfPath = path.join(
      uploadDir,
      `receipt-${bookingId}.pdf`
    );

    // GENERATE PDF
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return pdfPath;

  } catch (error) {

    console.log(error);

    throw error;
  }
};