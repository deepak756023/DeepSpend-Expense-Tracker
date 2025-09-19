package com.example.expensetracker.exception.custom_exception;

public class NoSuchUserExistWithThisMailIdException extends  RuntimeException{

    public NoSuchUserExistWithThisMailIdException(){

    }
    public NoSuchUserExistWithThisMailIdException(String msg){
        super(msg);
    }
}
