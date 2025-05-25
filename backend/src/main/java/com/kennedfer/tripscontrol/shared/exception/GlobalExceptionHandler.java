package com.kennedfer.tripscontrol.shared.exception;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.util.stream.Collectors;

import com.kennedfer.tripscontrol.dto.response.ErrorResponseDto;

@Hidden
@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseBody
    ErrorResponseDto
    handleHttpRequestMethodNotSupportedException(HttpServletRequest req, HttpRequestMethodNotSupportedException ex) {
        return new ErrorResponseDto("METHOD_NOT_ALLOWED", ex);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            HttpMessageNotReadableException.class,
            TypeMismatchException.class}
    )
    @ResponseBody
    ErrorResponseDto
    handleMessageNotReadableException(HttpServletRequest req, HttpMessageNotReadableException ex) {
        return new ErrorResponseDto("TYPE_MISMATCH_ERROR", ex);
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    ErrorResponseDto
    handleArgumentNotValidException(HttpServletRequest req, MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return new ErrorResponseDto("VALIDATION_ERROR", errorMessage);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    @ResponseBody
    ErrorResponseDto handleNotFound(HttpServletRequest req, NotFoundException ex) {
        return new ErrorResponseDto("NOT_FOUND", ex.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    @ResponseBody
    ErrorResponseDto
    handleInternalServerError(HttpServletRequest req, Exception ex) {
        System.out.println(ex.toString());
        return new ErrorResponseDto("INTERNAL_SERVER_ERROR", ex);
    }
}
