package com.example.expensetracker.exception.custom_exception;

public class PasswordNotSetException extends RuntimeException {
    public PasswordNotSetException(String message) {
        super(message);
    }

    public PasswordNotSetException() {
    }

}
