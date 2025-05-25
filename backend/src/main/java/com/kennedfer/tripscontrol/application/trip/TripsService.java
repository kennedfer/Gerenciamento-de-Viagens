package com.kennedfer.tripscontrol.application.trip;

import com.kennedfer.tripscontrol.dto.data.PagedTripData;
import com.kennedfer.tripscontrol.dto.request.TripRequestDto;
import com.kennedfer.tripscontrol.domain.model.Trip;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TripsService {
    public List<Trip> getAllTrips();
    public PagedTripData getPageTrips(int page, int pageSize);
    public Trip createTrip(TripRequestDto tripRequestDto);
    public Optional<Trip> findById(long id);
    public Trip updateTrip(long id, TripRequestDto data);
    public Trip deleteTrip(long id);

    List<Trip> getTripsBetween(LocalDateTime startDate, LocalDateTime endDate);
}
