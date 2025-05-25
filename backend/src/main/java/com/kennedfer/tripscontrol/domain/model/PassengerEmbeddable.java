package com.kennedfer.tripscontrol.domain.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

import io.swagger.v3.oas.annotations.media.Schema;

@Embeddable
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PassengerEmbeddable {

    @Schema(description = "Nome do passageiro", example = "João Silva")
    private String name;

    @Schema(description = "Centro de custo do passageiro", example = "1010")
    private Integer costCenter;

    @Schema(description = "Valor unitário atribuído ao passageiro", example = "150.75")
    private BigDecimal unitPrice;
}
