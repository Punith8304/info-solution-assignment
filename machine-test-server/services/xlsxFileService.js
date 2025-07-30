import * as XLSX from "xlsx";
import fs from "fs";
import { resolve } from "path";

export const excelFileRead = async (path) => {
  return new Promise((resolve, reject) => {
    try {
      // Read the file buffer
      const fileBuffer = fs.readFileSync(path);

      // Parse the workbook
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });

      // Get the first sheet name
      const sheetName = workbook.SheetNames[0];

      // Get data from the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Delete file after reading
      fs.unlinkSync(path);
      resolve({result: jsonData, fileUpload: true});
    } catch(error) {
      console.error("Error reading Excel file:", error);
      reject({ fileUpload: false});
    }
  })

};
