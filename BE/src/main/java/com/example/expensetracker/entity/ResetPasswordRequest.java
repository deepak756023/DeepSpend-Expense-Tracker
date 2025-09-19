package com.example.expensetracker.entity;


public class ResetPasswordRequest {
    private String token;
    private String newPassword;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public ResetPasswordRequest() {
    }

    public ResetPasswordRequest(String newPassword, String token) {
        this.newPassword = newPassword;
        this.token = token;
    }

    @Override
    public String toString() {
        return "ResetPasswordRequest{" +
                "newPassword='" + newPassword + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
