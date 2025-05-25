import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MainLayout } from "@/layouts";
import { TripsView, NewTripDialog, Pagination, } from "@features/trips/components";
import { Header } from "@/components";
import { postTrip } from "@/features/trips/api";
import { usePagination } from "@/hooks/usePagination";
import { useState } from "preact/hooks";
import { getTripById } from "@/features/trips/api/getTripById";
import { updateTrip } from "@/features/trips/api/updateTrip";
import { deleteTrip } from "@/features/trips/api/deleteTrip";
import { Toaster } from "@/utils/toaster";
import { ExcelButton } from "@/components/ExcelButton/ExcelButton";
import { exportExcelFile } from "@/utils/excel";
export function HomePage() {
    const [isTripDialogOpen, setIsTripDialogOpen] = useState(false);
    const [editingTrip, setEditingTrip] = useState(null);
    const pagination = usePagination();
    const { data, refresh } = pagination;
    const handleEdit = async (id) => {
        try {
            const json = await getTripById(id);
            const trip = json.data;
            Toaster.success(json.message);
            setEditingTrip(trip);
            setIsTripDialogOpen(true);
        }
        catch (e) {
            Toaster.danger(e.message);
        }
    };
    const handleNew = () => {
        setEditingTrip(null);
        setIsTripDialogOpen(true);
    };
    const handleSubmit = async (data) => {
        try {
            let response = { message: "" };
            if (editingTrip) {
                response = await updateTrip(editingTrip.id, data);
            }
            else {
                response = await postTrip(data);
            }
            Toaster.success(response.message);
        }
        catch (error) {
            Toaster.danger(error.message);
        }
        await refresh();
        setIsTripDialogOpen(false);
        setEditingTrip(null);
    };
    const handleDelete = async (id) => {
        try {
            const response = await deleteTrip(id);
            Toaster.warning(response.message);
            await refresh();
        }
        catch (error) {
            Toaster.danger(error);
        }
    };
    const handleExcelExport = async () => {
        try {
            exportExcelFile(data);
            Toaster.success("Exportação concluída com sucesso!");
        }
        catch (error) {
            Toaster.danger(error.message);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(NewTripDialog, { open: isTripDialogOpen, close: () => {
                    setIsTripDialogOpen(false);
                    setEditingTrip(null);
                }, submit: handleSubmit, initialData: editingTrip }), _jsx(MainLayout, { header: _jsx(Header, { openTravelDialog: handleNew }), main: _jsxs(_Fragment, { children: [_jsx(Pagination, { previous: pagination.previous, next: pagination.next, periodLabel: pagination.periodLabel }), _jsx(TripsView, { onEdit: handleEdit, trips: data, onDelete: handleDelete }), _jsx(ExcelButton, { onClick: handleExcelExport })] }) })] }));
}
