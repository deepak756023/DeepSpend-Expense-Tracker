package com.example.expensetracker.exception;

import com.example.expensetracker.exception.custom_exception.*;
import com.example.expensetracker.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(PasswordNotSetException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody ErrorResponse handleExpenseException(PasswordNotSetException exception) {
        return new ErrorResponse(exception.getMessage(), HttpStatus.BAD_REQUEST.value());
    }



    @ExceptionHandler(InvalidTokenException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public @ResponseBody ErrorResponse handleExpenseException(InvalidTokenException exception) {
        return new ErrorResponse(exception.getMessage(), HttpStatus.UNAUTHORIZED.value());
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody ErrorResponse handleExpenseException(UserAlreadyExistsException exception) {
        return new ErrorResponse(exception.getMessage(), HttpStatus.CONFLICT.value());
    }

    @ExceptionHandler(NoSuchUserExistWithThisMailIdException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody ErrorResponse handleExpenseException(NoSuchUserExistWithThisMailIdException exception) {
        return new ErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND.value());
    }

    @ExceptionHandler(WrongPasswordException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public @ResponseBody ErrorResponse handleExpenseException(WrongPasswordException exception) {
        return new ErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND.value());
    }

    @ExceptionHandler(AccountDeactivatedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public @ResponseBody ErrorResponse handleExpenseException(AccountDeactivatedException exception) {
        return new ErrorResponse(exception.getMessage(), HttpStatus.UNAUTHORIZED.value());
    }

    @ExceptionHandler(NoSuchExpensesExists.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody ErrorResponse handleExpenseException(NoSuchExpensesExists exception) {
        return new ErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND.value());
    }

//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public @ResponseBody ErrorResponse handleUmpException(Exception exception) {
//        return new ErrorResponse("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR.value());
//    }

}
