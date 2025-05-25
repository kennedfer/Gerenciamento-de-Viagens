import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export const exportExcelFile = (tripsFlatted) => {
    try {
        const worksheet = XLSX.utils.json_to_sheet(tripsFlatted);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Viagens");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "viagens.xlsx");
    }
    catch (error) {
        throw error;
    }
};
