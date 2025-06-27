import type { Passenger } from "@/types";

export interface PassengerRowProps {
  unitPrice: number | string;
  removePassenger: Function;
  index: number;
  setTripData: any;
  passenger: Passenger;
}

export interface PassengerTableProps {
  total: number;
  setTripData: any;
  passengers: any[];
}
