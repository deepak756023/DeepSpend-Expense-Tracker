package com.example.expensetracker.exception.custom_exception;

public class AccountDeactivatedException extends RuntimeException {

    public AccountDeactivatedException(String message) {
        super(message);
    }
    public AccountDeactivatedException() {
    }
}
