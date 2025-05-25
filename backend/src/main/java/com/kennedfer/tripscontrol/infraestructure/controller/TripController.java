package com.kennedfer.tripscontrol.infraestructure.controller;

import com.kennedfer.tripscontrol.dto.data.PagedTripData;
import com.kennedfer.tripscontrol.dto.request.TripRequestDto;
import com.kennedfer.tripscontrol.dto.response.ErrorResponseDto;
import com.kennedfer.tripscontrol.dto.response.SuccessResponseDto;
import com.kennedfer.tripscontrol.domain.model.Trip;
import com.kennedfer.tripscontrol.application.trip.TripsService;
import com.kennedfer.tripscontrol.shared.exception.NotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/trips")
@Tag(name = "Viagens", description = "Endpoints relacionados a gerenciamento de viagens")
public class TripController {

    private final TripsService tripsService;

    @Operation(summary = "Listar todas as viagens", description = "Retorna uma lista completa de todas as viagens registradas no sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Viagens carregadas com sucesso", content = @Content(schema = @Schema(implementation = SuccessResponseDto.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @GetMapping("/all")
    public ResponseEntity<SuccessResponseDto> getAllTrips() {
        List<Trip> allTrips = tripsService.getAllTrips();
        SuccessResponseDto response = new SuccessResponseDto(allTrips, "Todas as viagens retornadas");
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Listar viagens com filtros",
            description = "Retorna viagens com base na data inicial e final ou via paginação padrão (page, pageSize)."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Viagens carregadas com sucesso", content = @Content(schema = @Schema(implementation = SuccessResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Parâmetros inválidos", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @GetMapping
    public ResponseEntity<SuccessResponseDto> getTrips(
            @RequestParam(name = "page", required = false) Integer page,
            @RequestParam(name = "pageSize", required = false) Integer pageSize,
            @RequestParam(name = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(name = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        if (startDate != null && endDate != null) {
            List<Trip> trips = tripsService.getTripsBetween(startDate, endDate);
            String message = "Viagens carregadas por período com sucesso";
            SuccessResponseDto response = new SuccessResponseDto(Map.of("trips", trips, "hasNextPage", false), message);
            return ResponseEntity.ok().body(response);
        }

        PagedTripData tripData = tripsService.getPageTrips(page != null ? page : 0, pageSize != null ? pageSize : 10);
        String message = "Viagens carregadas com sucesso";
        SuccessResponseDto response = new SuccessResponseDto(tripData, message);

        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Criar uma nova viagem", description = "Cria uma nova viagem com os dados informados no corpo da requisição.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Viagem criada com sucesso", content = @Content(schema = @Schema(implementation = SuccessResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @PostMapping
    public ResponseEntity<SuccessResponseDto> createTrip(@RequestBody @Valid TripRequestDto trip) throws URISyntaxException {
        Trip trips = this.tripsService.createTrip(trip);
        String message = "Viagem criada com sucesso";
        SuccessResponseDto response = new SuccessResponseDto(trips, message);
        URI location = URI.create("/api/v1/trips/" + trips.getId());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "Atualizar uma viagem", description = "Atualiza os dados de uma viagem existente com base no ID informado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Viagem atualizada com sucesso", content = @Content(schema = @Schema(implementation = SuccessResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Viagem não encontrada", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponseDto> updateTrip(@PathVariable Long id, @RequestBody TripRequestDto data) {
        Trip updatedTrip = tripsService.updateTrip(id, data);
        return ResponseEntity.ok(new SuccessResponseDto(updatedTrip, "Viagem atualizada com sucesso"));
    }

    @Operation(summary = "Deletar uma viagem", description = "Remove uma viagem existente com base no ID informado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Viagem removida com sucesso", content = @Content(schema = @Schema(implementation = SuccessResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Viagem não encontrada", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponseDto> deleteTrip(@PathVariable Long id) {
        Trip deletedTrip = this.tripsService.deleteTrip(id);
        SuccessResponseDto response = new SuccessResponseDto(deletedTrip, "Viagem apagada com sucesso");
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Buscar uma viagem por ID", description = "Retorna os dados de uma viagem com base no ID informado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Viagem carregada com sucesso", content = @Content(schema = @Schema(implementation = SuccessResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Viagem não encontrada", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponseDto> getTripById(@PathVariable Long id) {
        return tripsService.findById(id)
                .map(trip -> ResponseEntity.ok(new SuccessResponseDto(trip, "Viagem carregada com sucesso")))
                .orElseThrow(() -> new NotFoundException("Viagem com ID " + id + " não encontrada"));
    }
}
