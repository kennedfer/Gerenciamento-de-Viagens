package com.kennedfer.tripscontrol.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "Resposta de erro padrão da API")
public class ErrorResponseDto {
    @Schema(description = "Código de erro", example = "NOT_FOUND")
    private String error;

    @Schema(description = "Mensagem descritiva do erro", example = "Recurso não encontrado")
    private String message;

    public ErrorResponseDto(String error, Exception ex){
        this.error = error;
        this.message = ex.getMessage();
    }
}
