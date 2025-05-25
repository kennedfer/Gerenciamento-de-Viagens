package com.kennedfer.tripscontrol.infraestructure.repository;

import com.kennedfer.tripscontrol.domain.model.Trip;
import com.kennedfer.tripscontrol.domain.model.TripsRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class TripRepositoryJpaImpl implements TripsRepository {

    private final SpringDataTripRepository springRepo;

    @Override
    public Trip save(Trip trip) {
        return springRepo.save(trip);
    }

    @Override
    public Page<Trip> findPage(Pageable pageable) {
        Page<Trip> pageTrip = springRepo.findAll(pageable);
        return pageTrip;
    }


    @Override
    public List<Trip> findAll() {
        return springRepo.findAll();
    }

    @Override
    public Optional<Trip> findByIdWithPassengers(long id) {
        return this.springRepo.findByIdWithPassengers(id);
    }

    @Override
    public Trip delete(long id) {
        Trip tripToDelete = springRepo.findByIdWithPassengers(id)
                .orElseThrow(() -> new EntityNotFoundException("Trip not found with id: " + id));

        springRepo.delete(tripToDelete);
        return tripToDelete;
    }

    @Override
    public List<Trip> findByExecDateBetween(LocalDateTime start, LocalDateTime end) {
        return this.springRepo.findAllByExecDateBetweenWithPassengers(start, end);
    }

}
