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

    @Scheme(description = "Veiculo usado na viagem", example = "Ônibus rodoviário 45 lugares")
    private String vehicle;

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

    @Schema(description = "Custo total da viagem", example = "450.00")
    private BigDecimal totalCost;

    @Schema(description = "Código de rota da viagem", example="CM-TURNO")
    private String codeRoute;

    @Schema(description = "Unidade contratual", example = "MENSAL")
    private String unit;

    @Schema(description = "Detalhes da viagem", example = "Viagem de volta do colaborador")
    private String details;

    @Schema(description = "Lista de passageiros")
    @ElementCollection
    private List<PassengerEmbeddable> passengers = new ArrayList<>();
}
