package com.kennedfer.tripscontrol.domain.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trips")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class Trip {

    @Schema(description = "ID da viagem", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Schema(description = "Identificador do carro", example = "CAR123")
    private String carId;

    @Schema(description = "Quilometragem percorrida", example = "120.5")
    private Double km;

    @Schema(description = "Tipo da viagem", example = "Negócios")
    private String tripType;

    @Schema(description = "Data de execução da viagem", example = "2024-05-01T14:30:00")
    private LocalDateTime execDate;

    @Schema(description = "Origem da viagem", example = "São Paulo")
    private String origin;

    @Schema(description = "Destino da viagem", example = "Campinas")
    private String destination;

    @Schema(description = "Tipo de veículo", example = "Automóvel")
    private String vehicleType;

    @Schema(description = "Custo total da viagem", example = "450.00")
    private BigDecimal totalCost;

    @Schema(description = "Tipo de entrada", example = "Manual")
    private String entryType;

    @Schema(description = "Conta da viagem", example = "123456")
    private String account;

    @Schema(description = "Lista de passageiros")
    @ElementCollection
    private List<PassengerEmbeddable> passengers = new ArrayList<>();

    public Trip(
            String carId,
            Double km,
            String tripType,
            LocalDateTime execDate,
            String origin,
            String destination,
            String vehicleType,
            BigDecimal totalCost,
            String entryType,
            String account,
            List<PassengerEmbeddable> passengers
    ) {
        this.carId = carId;
        this.km = km;
        this.tripType = tripType;
        this.execDate = execDate;
        this.origin = origin;
        this.destination = destination;
        this.vehicleType = vehicleType;
        this.totalCost = totalCost;
        this.entryType = entryType;
        this.account = account;
        this.passengers = passengers;
    }
}
