package com.kennedfer.tripscontrol.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "Resposta de sucesso padrão da API")
public class SuccessResponseDto<T> {

    @Schema(
            description = "Dados retornados pela requisição",
            example = "{ \"id\": 1, \"destino\": \"São Paulo\" }"
    )
    private T data;

    @Schema(
            description = "Mensagem descritiva sobre o sucesso da operação",
            example = "Viagem criada com sucesso"
    )
    private String message;
}
