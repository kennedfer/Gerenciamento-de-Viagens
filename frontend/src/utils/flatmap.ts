export const flatTrips = (trips) =>
  trips.flatMap((trip) =>
    trip.passengers.map((passenger) => ({
      ...passenger,
      tripId: trip.id,
      carId: trip.carId,
      origin: trip.origin,
      destination: trip.destination,
      execDate: trip.execDate,
      totalCost: trip.totalCost,
      km: trip.km,
      tripType: trip.tripType,
    }))
  );
