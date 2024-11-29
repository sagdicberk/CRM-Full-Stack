package com.sgdcbrk.crm.util.exception;

public class JwtValidationException  extends RuntimeException{
    public JwtValidationException(String message) {
        super(message);
    }
}
