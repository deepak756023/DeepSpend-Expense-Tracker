package com.example.expensetracker.exception.custom_exception;

public class NoSuchExpensesExists extends RuntimeException{

    public NoSuchExpensesExists(){

    }

    public NoSuchExpensesExists(String msg){
        super(msg);
    }
}
