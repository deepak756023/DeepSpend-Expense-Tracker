package com.example.expensetracker.exception.custom_exception;

public class WrongPasswordException extends RuntimeException{
    public WrongPasswordException(){

    }

    public WrongPasswordException(String msg){
        super(msg);
    }
}
