import { useEffect, useState } from "preact/hooks";

export function useGetTrips() {
  const [data, setData] = useState([]);

  async function fetchTrips() {
    const response = await fetch("http://localhost:8080/api/v1/trips");
    const json = await response.json();

    const trips = json.data;

    const tripsFlatten = trips.flatMap((trip) =>
      trip.passengers.map((passenger) => ({
        ...passenger,
        tripId: trip.id,
        carId: trip.carId,
        origin: trip.origin,
        destination: trip.destination,
        execDate: trip.execDate,
        totalCost: trip.totalCost,
      }))
    );

    setData(tripsFlatten);
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  return { data, refresh: fetchTrips };
}
