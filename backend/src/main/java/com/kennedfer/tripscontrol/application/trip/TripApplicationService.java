package com.kennedfer.tripscontrol.application.trip;

import com.kennedfer.tripscontrol.domain.model.PassengerEmbeddable;
import com.kennedfer.tripscontrol.dto.data.PagedTripData;
import com.kennedfer.tripscontrol.dto.request.TripRequestDto;
import com.kennedfer.tripscontrol.domain.model.Trip;
import com.kennedfer.tripscontrol.domain.model.TripsRepository;
import com.kennedfer.tripscontrol.shared.exception.NotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class TripApplicationService implements TripsService {
    private final TripsRepository tripsRepository;

    public List<Trip> getAllTrips() {
        return this.tripsRepository.findAll();
    }

    @Override
    public PagedTripData getPageTrips(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Trip> tripsPage = this.tripsRepository.findPage(pageable);

        PagedTripData tripData = new PagedTripData(tripsPage.getContent(), tripsPage.hasNext());

        return tripData;
    }

    @Override
    public Optional<Trip> findById(long id) {
        return tripsRepository.findByIdWithPassengers(id);
    }

    private List<PassengerEmbeddable> updatePassengersPrice(List<PassengerEmbeddable> requestPassenger,
            BigDecimal totalCost) {
        if (requestPassenger == null || requestPassenger.isEmpty() || totalCost == null) {
            return Collections.emptyList();
        }

        BigDecimal unitPrice = totalCost.divide(
                BigDecimal.valueOf(requestPassenger.size()), 3, RoundingMode.HALF_EVEN);

        List<PassengerEmbeddable> updatedPassengers = requestPassenger.stream()
                .map(p -> new PassengerEmbeddable(
                        p.getName(),
                        p.getCostCenter(),
                        unitPrice))
                .collect(Collectors.toList());

        return updatedPassengers;
    }

    @Override
    public Trip deleteTrip(long id) {
        return tripsRepository.delete(id);
    }

    @Override
    public List<Trip> getTripsBetween(LocalDateTime startDate, LocalDateTime endDate) {
        return this.tripsRepository.findByExecDateBetween(startDate, endDate);
    }

    public Trip createTrip(TripRequestDto tripRequestDto) {
        Trip trip = new Trip();

        mapDtoToTrip(trip, tripRequestDto);
        
        trip.setPassengers(passengers);

        tripsRepository.save(trip);
        return trip;
    }

    private void mapDtoToTrip(Trip trip, TripRequestDto dto) {
        trip.setVehicle(dto.getVehicle());
        trip.setKm(dto.getKm());
        trip.setTripType(dto.getTripType());
        trip.setExecDate(dto.getExecDate());
        trip.setOrigin(dto.getOrigin());
        trip.setDestination(dto.getDestination());
        trip.setTotalCost(dto.getTotalCost());
        trip.setCodeRoute(dto.getCodeRoute());
        trip.setUnit(dto.getUnit());
        trip.setDetails(dto.getDetails());

        List<PassengerEmbeddable> passengers = updatePassengersPrice(
                dto.getPassengers(),
                dto.getTotalCost());
        trip.setPassengers(passengers);
    }

    @Override
    public Trip updateTrip(long id, @Valid TripRequestDto tripRequestDto) {
        Trip existingTrip = this.tripsRepository.findByIdWithPassengers(id)
                .orElseThrow(() -> new NotFoundException("Viagem com ID " + id + " não encontrada"));

        mapDtoToTrip(existingTrip, tripRequestDto);

        return tripsRepository.save(existingTrip);
    }
}
