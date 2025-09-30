package com.example.expensetracker.controller;

import com.example.expensetracker.entity.ResetPasswordRequest;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.exception.custom_exception.NoSuchUserExistWithThisMailIdException;
import com.example.expensetracker.exception.custom_exception.UserAlreadyExistsException;
import com.example.expensetracker.repository.UserRepo;
import com.example.expensetracker.response.ApiResponse;
import com.example.expensetracker.response.ErrorResponse;
import com.example.expensetracker.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
public class UserController {

    private final UserRepo userRepo;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserRepo userRepo, UserService userService){
        this.userRepo = userRepo;
        this.userService = userService;

    }

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @GetMapping("/welcome")
    public void greetings(){
        logger.info("welcome to the expense tracker project");

    }

    @PostMapping("/auth/register")
    public ApiResponse<User> addUser(@RequestBody User user) {
        User existingUser = userRepo.findByUsername(user.getUsername());

        if (existingUser != null) {
            if (existingUser.getPassword() == null) {

                throw new UserAlreadyExistsException(

                        "User already registered but password not generated, please check your mail"
                );
            }
            throw new UserAlreadyExistsException("User already registered");
        }
        this.userRepo.save(user);
        userService.createPasswordResetToken(user.getUsername(), "create password request");
        return new ApiResponse<>(200, "Check Your mail for Password generation", user);
    }

    // 12
    @PostMapping("/auth/login")
    public ApiResponse<String> login(@RequestParam String username, @RequestParam String password) {
        String jwtToken = userService.verify(username, password);
        return new ApiResponse<>(200, "user login successfully", jwtToken);


    }

    @GetMapping("/auth/forgot-password")
    public ApiResponse<String> forgotPassword(@RequestParam String email) {
        userService.createPasswordResetToken(email, "password reset request");
        return new ApiResponse<>(200, "Password reset link sent to your mailId : " + email, email);
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<Boolean> resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok(true);
    }

    @GetMapping("/findUserNameFromToken")
    public ApiResponse<String> findUserNameFromToken(@RequestParam String token){
        String username = userService.findUserNameFromToken(token);
        return new ApiResponse<>(200, "Founded UserName from Token", username);

    }

    @GetMapping("/admin/getAllUsers")
    public List<User> getAllUsers(){

        List<User> list = userRepo.findAll();
        return list.stream().filter(User::isActive).toList();
    }

    @GetMapping("/user/getUser/{id}")
    public ApiResponse<User> getUser(@PathVariable Long id){
        User user = userRepo.findById(id).orElseThrow(() -> new NoSuchUserExistWithThisMailIdException("User Not present"));
        if(!user.isActive()){
            throw new NoSuchUserExistWithThisMailIdException("User Not present");
        }
        return new ApiResponse<>(200, "User fetched successfully", user);
    }

    @DeleteMapping("/admin/deleteUser/{username}")
    public ApiResponse<User> deleteUser(@PathVariable String username){
        User user = userRepo.findByUsername(username);
        if(user == null){
            throw new NoSuchUserExistWithThisMailIdException("User Not present");
        }
        user.setActive(false);
        userRepo.save(user);
        return new ApiResponse<>(200, "User deleted successfully", user);
    }

    @DeleteMapping("/admin/deleteSelectedUsers")
    public ApiResponse<String> deleteSelectedUsers(@RequestBody List<User> user){
        for(User u : user){
            User existingUser = userRepo.findByUsername(u.getUsername());
            if(existingUser != null){
                existingUser.setActive(false);
                userRepo.save(existingUser);
            }
        }
        return new ApiResponse<>(200, "Selected Users deleted successfully", user.toString());

    }

    @PutMapping("/user/updateUser/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        User oldUser = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        oldUser.setFirstName(user.getFirstName());
        oldUser.setLastName(user.getLastName());
        oldUser.setUsername(user.getUsername());
        oldUser.setRole(user.getRole());
        oldUser.setZipCode(user.getZipCode());
        oldUser.setProfession(user.getProfession());

        return userRepo.save(oldUser);
    }

}
