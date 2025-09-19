package com.example.expensetracker.service;

import ch.qos.logback.core.util.StringUtil;
import com.example.expensetracker.entity.PasswordResetToken;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.exception.custom_exception.InvalidTokenException;
import com.example.expensetracker.exception.custom_exception.NoSuchUserExistWithThisMailIdException;
import com.example.expensetracker.exception.custom_exception.PasswordNotSetException;
import com.example.expensetracker.exception.custom_exception.WrongPasswordException;
import com.example.expensetracker.helper.EmailSenderService;
import com.example.expensetracker.repository.PasswordResetTokenRepository;
import com.example.expensetracker.repository.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class UserService {


    private final UserRepo repo;
    private final JWTService jwtService;
    private final AuthenticationManager authManager;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailSenderService emailSenderService;
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserService(UserRepo repo, JWTService jwtService, AuthenticationManager authManager, PasswordResetTokenRepository tokenRepository, EmailSenderService emailSenderService, PasswordResetTokenRepository passwordResetTokenRepository){
        this.repo = repo;
        this.jwtService = jwtService;
        this.authManager = authManager;
        this.tokenRepository = tokenRepository;
        this.emailSenderService = emailSenderService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return user;

    }


    public String verify(String username, String password) {
        User user = repo.findByUsername(username);
        if(user == null){
            throw  new NoSuchUserExistWithThisMailIdException("You don't have any account with this Email");
        }
        if(!encoder.matches(password, user.getPassword())){
            throw  new WrongPasswordException("You have Entered wrong password");
        }

        Authentication authentication =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), password));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getUsername()) ;
        } else {
            return "fail";
        }
    }

    //    for password reset
    public void createPasswordResetToken(String username) {
        User user = repo.findByUsername(username);

        if (user == null) {
            throw new NoSuchUserExistWithThisMailIdException("No user present with this Username : " + username);
        }

        if(user.getPassword() == null){
            throw new PasswordNotSetException("You have not generated your password, please check your mail to set your password");
        }


        PasswordResetToken existingToken = tokenRepository.findByUser(user);

        String newToken = UUID.randomUUID().toString();
        LocalDateTime newExpiry = LocalDateTime.now().plusMinutes(1440);

        if (existingToken != null) {
            existingToken.setToken(newToken);
            existingToken.setExpiryDate(newExpiry);
            tokenRepository.save(existingToken);
        } else {
            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(newToken);
            resetToken.setUser(user);
            resetToken.setExpiryDate(newExpiry);
            tokenRepository.save(resetToken);
        }
        emailSenderService.sendResetEmail(user.getUsername(), newToken);
    }

    public void resetPassword(String token, String newPassword) {
        if (StringUtil.isNullOrEmpty(token) || StringUtil.isNullOrEmpty(newPassword)) {
            logger.info("Either Token or newPassword is Empty");
        } else {
            PasswordResetToken resetToken = tokenRepository.findByToken(token).orElseThrow(() -> new InvalidTokenException("Invalid token"));
            if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) throw new InvalidTokenException("Token expired");
            User user = resetToken.getUser();
            user.setPassword(encoder.encode(newPassword));
            repo.save(user);
        }
    }

    public String findUserNameFromToken(String token) {
        Long userId = passwordResetTokenRepository.findUserIdByToken(token);

        return repo.findById(userId)
                .map(User::getUsername)
                .orElse(null); // or throw new RuntimeException("User not found");
    }

}
