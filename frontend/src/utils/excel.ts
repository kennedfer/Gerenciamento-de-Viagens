import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const formatCurrency = (value) =>
  value != null ? `R$ ${value.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : "";

const formatDate = (date: Date) => {
  return  date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const formatTodayDate = () => {
  const date = new Date(Date.now());
  return formatDate(date);
}

const formatDateString = (dateStr) => {
  const date = new Date(dateStr);
  return formatDate(date)
};

export const exportExcelFile = (tripsFlatted) => {
  try {
    const translatedTrips = tripsFlatted.map((trip) => ({
      "Nome do Passageiro": trip.name,
      "Centro de Custo": trip.costCenter,
      "Preço Unitário": formatCurrency(trip.unitPrice),
      "Custo Total": formatCurrency(trip.totalCost),
      "Código da Rota": trip.codeRoute || "N/A",
      "Unidade de Medida": trip.unit || "N/A",
      "Distância (km)": trip.km != null ? `${trip.km} km` : "N/A",
      "Veículo": trip.vehicle || "N/A",
      "Origem": trip.origin,
      "Destino": trip.destination,
      "Data de Execução": formatDateString(trip.execDate),
      "Tipo de Viagem": trip.tripType,
      "Detalhes": trip.details || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(translatedTrips);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Viagens");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `Relatório de Logística Terrestre ${formatTodayDate()}.xlsx`);
  } catch (error) {
    throw error;
  }
};
