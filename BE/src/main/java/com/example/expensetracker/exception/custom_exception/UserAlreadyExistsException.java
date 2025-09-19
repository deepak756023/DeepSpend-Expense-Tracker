package com.example.expensetracker.exception.custom_exception;


public class UserAlreadyExistsException extends RuntimeException{

    public UserAlreadyExistsException() {

    }

    public UserAlreadyExistsException(String msg) {
        super(msg);
    }
}
