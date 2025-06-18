import { Button, Card, Popover } from "@blueprintjs/core";
import styles from "./TripsView.module.css";
import type {
  TripFlatted,
  TripRowProps,
  TripsViewProps,
} from "./TripsView.types";
import { DeleteTripAlert } from "../DeletTripAlert/DeleteTripPopover";

function groupByTripId(trips: TripFlatted[]) {
  const grouped = new Map<number, typeof trips>();

  trips.forEach((trip) => {
    if (!grouped.has(trip.tripId)) {
      grouped.set(trip.tripId, []);
    }
    grouped.get(trip.tripId)?.push(trip);
  });

  return Array.from(grouped.entries()); // [ [tripId, [Trip, Trip, ...]], ... ]
}
const TripRow = ({ trip }: TripRowProps) => (
  <div className={styles.row}>
    <div>{trip.name}</div>
    <div>{trip.costCenter}</div>
    <div>{new Date(trip.execDate).toLocaleDateString("pt-BR")}</div>
    <div>{trip.vehicle || trip.carId || "—"}</div>
    <div>
      {trip.origin} → {trip.destination}
    </div>
    <div>{trip.km != null ? `${trip.km} km` : "—"}</div>
    <div>{trip.tripType}</div>
    <div>R$ {trip.unitPrice?.toFixed(2).replace(".", ",")}</div>
    <div>R$ {trip.totalCost?.toFixed(2).replace(".", ",")}</div>
    <div>{trip.codeRoute || "—"}</div>
    <div>{trip.unit || "—"}</div>
    <div>{trip.details || "—"}</div>
  </div>
);

export const TripsView = ({ trips, onEdit, onDelete }: TripsViewProps) => {
  const groupedTrips = groupByTripId(trips);

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div>Passageiro</div>
        <div>Centro de Custo</div>
        <div>Data</div>
        <div>Veículo</div>
        <div>Origem → Destino</div>
        <div>KM</div>
        <div>Tipo</div>
        <div>Preço Unitário</div>
        <div>Custo Total</div>
        <div>Código da Rota</div>
        <div>Unidade</div>
        <div>Detalhes</div>
      </div>

      {groupedTrips.map(([tripId, group]) => (
        <div key={tripId} className={styles.tripGroup}>
          <Card compact>
            <div className={styles.titleBar}>
              <h3 className={styles.title}>Viagem #{tripId}</h3>
              <Button size="small" icon="edit" onClick={() => onEdit(tripId)} />
              <DeleteTripAlert onConfirm={() => onDelete(tripId)} />
            </div>

            {group.map((trip, index) => (
              <TripRow key={trip.tripId + index} trip={trip} />
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
};
