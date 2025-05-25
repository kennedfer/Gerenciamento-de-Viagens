package com.kennedfer.tripscontrol.infraestructure.repository;

import com.kennedfer.tripscontrol.domain.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SpringDataTripRepository extends JpaRepository<Trip, Long> {
    @Query("SELECT t FROM Trip t LEFT JOIN FETCH t.passengers WHERE t.id = :id")
    Optional<Trip> findByIdWithPassengers(Long id);

    @Query("SELECT t FROM Trip t LEFT JOIN FETCH t.passengers WHERE t.execDate BETWEEN :start AND :end")
    List<Trip> findAllByExecDateBetweenWithPassengers(LocalDateTime start, LocalDateTime end);
}
