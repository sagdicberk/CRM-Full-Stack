package com.sgdcbrk.crm.controller;

import com.sgdcbrk.crm.util.exception.JwtValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(JwtValidationException.class)
    public ResponseEntity<String> handleJwtValidationException(JwtValidationException ex) {
        System.err.println("JWT Validation Error: " + ex.getMessage());


        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token süresi dolmuş. Lütfen yeniden giriş yapın.");
    }
}
