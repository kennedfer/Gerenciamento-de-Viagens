export interface Trip {
  id: number;
  km: string;
  vehicle: string;
  tripType: string;
  execDate: string;
  origin: string;
  destination: string;
  totalCost: number;
  codeRoute: string;
  unit: string;
  details: string;
  passengerName: string;
  passengerCostCenter: string;
  passengerUnitPrice: number;
}

export interface Passenger {
  name: string;
  costCenter: string;
  unitPrice: number | string;
}

export interface TripPayload {
  km: string;
  vehicle: string;
  tripType: string;
  execDate: string;
  origin: string;
  destination: string;
  totalCost: number;
  codeRoute: string;
  unit: string;
  details: string;
  passengers: Passenger[];
}
