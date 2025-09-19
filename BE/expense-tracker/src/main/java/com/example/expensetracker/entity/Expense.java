package com.example.expensetracker.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false, length = 30)
    private Category category;

    @Column(name = "amount", nullable = false)
    private int amount;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "expense_date", nullable = false)
    private LocalDate expenseDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_at")
    private LocalDateTime createdAt;


    public int getAmount() {
        return amount;
    }

    public Category getCategory() {
        return category;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Expense() {
    }

    public Expense(int amount, Category category, LocalDateTime createdAt, String description, LocalDate expenseDate, Long id, User user) {
        this.amount = amount;
        this.category = category;
        this.createdAt = createdAt;
        this.description = description;
        this.expenseDate = expenseDate;
        this.id = id;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "amount=" + amount +
                ", id=" + id +
                ", user=" + user +
                ", category=" + category +
                ", description='" + description + '\'' +
                ", expenseDate=" + expenseDate +
                ", createdAt=" + createdAt +
                '}';
    }
}
