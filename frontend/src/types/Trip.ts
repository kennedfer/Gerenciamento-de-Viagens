export interface Trip {
  id: number;
  carId: string;
  km: string;
  tripType: string;
  execDate: string;
  origin: string;
  destination: string;
  vehicleType: string;
  totalCost: number;
  entryType: string;
  account: string;
  passengerName: string;
  passengerCostCenter: string;
  passengerUnitPrice: number;
}

export interface Passenger {
  name: string;
  costCenter: string;
  unitPrice: number;
}

export interface TripPayload {
  carId: string;
  km: string;
  tripType: string;
  execDate: string;
  origin: string;
  destination: string;
  vehicleType: string;
  totalCost: number;
  entryType: string;
  account: string;
  passengers: Passenger[];
}
