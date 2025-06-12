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

        trip.setVehicle(tripRequestDto.getVehicle());
        trip.setKm(tripRequestDto.getKm());
        trip.setTripType(tripRequestDto.getTripType());
        trip.setExecDate(tripRequestDto.getExecDate());
        trip.setOrigin(tripRequestDto.getOrigin());
        trip.setDestination(tripRequestDto.getDestination());
        trip.setTotalCost(tripRequestDto.getTotalCost());
        trip.setCoodRoute(tripRequestDto.getCoodRoute());
        trip.setUnit(tripRequestDto.getUnit());
        trip.setDetails(tripRequestDto.getDetails());

        List<PassengerEmbeddable> passengers = updatePassengersPrice(
                tripRequestDto.getPassengers(),
                tripRequestDto.getTotalCost());
        trip.setPassengers(passengers);

        tripsRepository.save(trip);
        return trip;
    }

    @Override
    public Trip updateTrip(long id, @Valid TripRequestDto data) {
        Trip existingTrip = this.tripsRepository.findByIdWithPassengers(id)
                .orElseThrow(() -> new NotFoundException("Viagem com ID " + id + " não encontrada"));

        existingTrip.setVehicle(data.getVehicle());
        existingTrip.setKm(data.getKm());
        existingTrip.setTripType(data.getTripType());
        existingTrip.setExecDate(data.getExecDate());
        existingTrip.setOrigin(data.getOrigin());
        existingTrip.setDestination(data.getDestination());
        existingTrip.setTotalCost(data.getTotalCost());
        existingTrip.setCoodRoute(data.getCoodRoute());
        existingTrip.setUnit(data.getUnit());
        existingTrip.setDetails(data.getDetails());

        List<PassengerEmbeddable> passengers = updatePassengersPrice(
                data.getPassengers(),
                data.getTotalCost());
        existingTrip.setPassengers(passengers);

        return tripsRepository.save(existingTrip);
    }

}
