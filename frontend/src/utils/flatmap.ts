export const flatTrips = (trips) =>
  trips.flatMap((trip) =>
    trip.passengers.map((passenger) => ({
      ...passenger,
      km: trip.km,
      tripId: trip.id,
      vehicle: trip.vehicle,
      tripType: trip.tripType,
      execDate: trip.execDate,
      origin: trip.origin,
      destination: trip.destination,
      totalCost: trip.totalCost,
      codeRoute: trip.codeRoute,
      unit: trip.unit,
      details: trip.details
    }))
  );
