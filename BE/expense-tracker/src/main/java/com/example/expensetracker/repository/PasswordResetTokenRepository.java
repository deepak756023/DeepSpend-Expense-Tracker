package com.example.expensetracker.repository;

import com.example.expensetracker.entity.PasswordResetToken;
import com.example.expensetracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);

    PasswordResetToken findByUser(User user);

    @Query("SELECT t.user.id FROM PasswordResetToken t WHERE t.token = :token")
    Long findUserIdByToken(@Param("token") String token);
}
