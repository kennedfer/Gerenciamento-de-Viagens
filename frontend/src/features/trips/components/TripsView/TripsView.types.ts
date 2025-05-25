import type { Trip } from "@/types";

//TODO: Arrumar o tipo de "trip"
export interface TripRowProps {
  trip: any;
  key: number;
}

export interface TripsViewProps {
  trips: TripFlatted[];
  onEdit: Function;
  onDelete: Function;
}

export interface TripFlatted {
  tripId: number;
  carId: string;
  origin: string;
  destination: string;
  execDate: string;
  totalCost: number;
  km: number;
  tripType: string;
}
