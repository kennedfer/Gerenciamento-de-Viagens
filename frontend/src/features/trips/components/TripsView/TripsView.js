import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Card } from "@blueprintjs/core";
import styles from "./TripsView.module.css";
import { DeleteTripAlert } from "../DeletTripAlert/DeleteTripPopover";
function groupByTripId(trips) {
    const grouped = new Map();
    trips.forEach((trip) => {
        if (!grouped.has(trip.tripId)) {
            grouped.set(trip.tripId, []);
        }
        grouped.get(trip.tripId)?.push(trip);
    });
    return Array.from(grouped.entries()); // [ [tripId, [Trip, Trip, ...]], ... ]
}
const TripRow = ({ trip }) => (_jsxs("div", { className: styles.row, children: [_jsx("div", { children: trip.name }), _jsx("div", { children: trip.costCenter }), _jsx("div", { children: trip.execDate }), _jsx("div", { children: trip.carId }), _jsxs("div", { children: [trip.origin, " \u2192 ", trip.destination] }), _jsxs("div", { children: [trip.km, " km"] }), _jsx("div", { children: trip.tripType }), _jsxs("div", { children: ["R$ ", trip.unitPrice.toFixed(2)] })] }));
export const TripsView = ({ trips, onEdit, onDelete }) => {
    const groupedTrips = groupByTripId(trips);
    return (_jsxs("div", { className: styles.table, children: [_jsxs("div", { className: styles.header, children: [_jsx("div", { children: "Passageiro" }), _jsx("div", { children: "Centro de Custo" }), _jsx("div", { children: "Data" }), _jsx("div", { children: "Carro" }), _jsx("div", { children: "Origem \u2192 Destino" }), _jsx("div", { children: "KM" }), _jsx("div", { children: "Tipo" }), _jsx("div", { children: "Pre\u00E7o Unit\u00E1rio" })] }), groupedTrips.map(([tripId, group]) => (_jsx("div", { className: styles.tripGroup, children: _jsxs(Card, { compact: true, children: [_jsxs("div", { className: styles.titleBar, children: [_jsxs("h3", { className: styles.title, children: ["Viagem #", tripId] }), _jsx(Button, { size: "small", icon: "edit", onClick: () => onEdit(tripId) }), _jsx(DeleteTripAlert, { onConfirm: () => onDelete(tripId) })] }), group.map((trip, index) => (_jsx(TripRow, { trip: trip }, trip.tripId + index)))] }) }, tripId)))] }));
};
