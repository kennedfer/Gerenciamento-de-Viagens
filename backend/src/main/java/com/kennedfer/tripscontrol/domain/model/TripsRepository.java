package com.kennedfer.tripscontrol.domain.model;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TripsRepository {
    Trip save(Trip trip);
    Page<Trip> findPage(Pageable pageable);
    List<Trip> findAll();
    Optional<Trip> findByIdWithPassengers(long id);
    Trip delete(long id);
    List<Trip> findByExecDateBetween(LocalDateTime start, LocalDateTime end);
}
