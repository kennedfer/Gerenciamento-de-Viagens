package com.kennedfer.tripscontrol.dto.request;

import com.kennedfer.tripscontrol.domain.model.PassengerEmbeddable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
public class TripRequestDto {

    @Schema(description = "Tipo de veículo utilizado", example = "Ônibus rodoviário 45 lugares")
    @NotBlank(message = "O tipo do veículo não pode ser vazio.")
    private String vehicle;

    @Schema(description = "Quilometragem percorrida", example = "120.5")
    @Positive(message = "A quilometragem deve ser um número positivo.")
    private Double km;

    @Schema(description = "Tipo da viagem", example = "Negócios")
    @NotBlank(message = "O tipo da viagem não pode ser vazio.")
    private String tripType;

    @Schema(description = "Data de execução da viagem", example = "2024-05-01T14:30:00")
    @NotNull(message = "A data da viagem é obrigatória.")
    @PastOrPresent(message = "A data da viagem deve ser hoje ou uma data passada.")
    private LocalDateTime execDate;

    @Schema(description = "Origem da viagem", example = "São Paulo")
    @NotBlank(message = "A origem não pode ser vazia.")
    private String origin;

    @Schema(description = "Destino da viagem", example = "Campinas")
    @NotBlank(message = "O destino não pode ser vazio.")
    private String destination;

    @Schema(description = "Custo total da viagem", example = "450.00")
    @NotNull(message = "O custo total não pode ser vazio.")
    @Positive(message = "O custo total deve ser um valor positivo.")
    private BigDecimal totalCost;

    @Schema(description = "Código de rota da viagem", example = "CM-TURNO")
    @NotBlank(message = "O código de rota não pode ser vazio.")
    private String codeRoute;

    @Schema(description = "Unidade contratual", example = "MENSAL")
    @NotBlank(message = "A unidade contratual não pode ser vazia.")
    private String unit;

    @Schema(description = "Detalhes da viagem", example = "Viagem de volta do colaborador")
    private String details;

    @Schema(description = "Lista de passageiros da viagem")
    @Valid
    @NotEmpty(message = "Uma viagem precisa de ao menos um passageiro.")
    private ArrayList<PassengerEmbeddable> passengers;
}
