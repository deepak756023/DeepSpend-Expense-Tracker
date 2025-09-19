package com.example.expensetracker.response;

public class ErrorResponse {

    int statusCode;
    String errorMsg;

    public ErrorResponse() {
    }

    public ErrorResponse(String errorMsg, int statusCode) {
        this.errorMsg = errorMsg;
        this.statusCode = statusCode;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    @Override
    public String toString() {
        return "ErrorResponse{" +
                "errorMsg='" + errorMsg + '\'' +
                ", statusCode=" + statusCode +
                '}';
    }
}
