package com.kennedfer.tripscontrol.dto.request;

import com.kennedfer.tripscontrol.domain.model.PassengerEmbeddable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import io.swagger.v3.oas.annotations.media.Schema;

@Getter
public class TripRequestDto {

    @Schema(description = "Identificador do carro", example = "CAR123")
    @NotBlank(message = "A Identificação do Carro não pode ser vazio.")
    private String carId;

    @Schema(description = "Quilometragem percorrida", example = "120.5")
    @Positive(message = "A quilometragem deve ser um número positivo.")
    private Double km;

    @Schema(description = "Tipo da viagem", example = "Negócios")
    @NotBlank(message = "O tipo da viagem não pode ser vazio.")
    private String tripType;

    @Schema(description = "Data de execução da viagem", example = "2024-05-01T14:30:00")
    @NotNull(message = "A data da viagem é obrigatório.")
    @PastOrPresent(message = "A data da viagem deve ser hoje ou uma data passada.")
    private LocalDateTime execDate;

    @Schema(description = "Origem da viagem", example = "São Paulo")
    @NotBlank(message = "A origem não pode ser vazia.")
    private String origin;

    @Schema(description = "Destino da viagem", example = "Campinas")
    @NotBlank(message = "O destino não pode ser vazio.")
    private String destination;

    @Schema(description = "Tipo de veículo utilizado", example = "Automóvel")
    @NotBlank(message = "O tipo do veiculo não pode ser vazio.")
    private String vehicleType;

    @Schema(description = "Custo total da viagem", example = "450.00")
    @NotNull(message = "O custo total não pode ser vazio.")
    @Positive(message = "O custo total deve ser um valor positivo.")
    private BigDecimal totalCost;

    @Schema(description = "Tipo de entrada da viagem", example = "Manual")
    @NotBlank(message = "O tipo de entrada não pode ser vazio.")
    private String entryType;

    @Schema(description = "Conta associada à viagem", example = "123456")
    @NotBlank(message = "O campo conta não pode ser vazio.")
    @Positive(message = "O campo conta deve ser positivo")
    private String account;

    @Schema(description = "Lista de passageiros da viagem")
    @Valid
    @NotEmpty(message = "Uma viagem precisa de ao menos um passageiro")
    private ArrayList<PassengerEmbeddable> passengers;
}
