package com.kennedfer.tripscontrol.dto.data;

import com.kennedfer.tripscontrol.domain.model.Trip;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Setter @Getter
public class PagedTripData {
    private List<Trip> trips;
    private boolean hasNextPage;
}