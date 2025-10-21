package com.example.expensetracker.helper;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;


@Service
public class EmailSenderService {

    private final JavaMailSender mailSender;

    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    //Password Reset
    public void sendResetEmail(String to, String token, String subject) {

        String url = subject.equals("Password Reset Request") ? "reset-password" : "create-password";
        String link = "http://localhost:4200/" + url + "?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("deepaknayak55260@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText("Click the link to reset your password: " + link);
        mailSender.send(message);
    }
}
