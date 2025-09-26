package com.example.expensetracker.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true, length = 150)
    private String username;

    @Column(name = "password", length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private Role role = Role.USER;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "firstname", nullable = false)
    private String firstName;

    @Column(name = "zipcode")
    private String zipCode;

    @Column(name = "profession")
    private String profession;

    // New boolean field for Terms of Service agreement
    @JsonProperty("isAgreeTOS")
    @Column(name = "is_agree_TOS", nullable = false)
    private boolean isAgreeTOS;
    @JsonProperty("isActive")
    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "phone", nullable = false)
    private String phone;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Expense> expenses = new ArrayList<>();

    // No-argument constructor
    public User() {
    }

    public User(LocalDateTime createdAt, List<Expense> expenses, String firstName, Long id, boolean isActive, boolean isAgreeTOS, String lastName, String password, String phone, String profession, Role role, String username, String zipCode) {
        this.createdAt = createdAt;
        this.expenses = expenses;
        this.firstName = firstName;
        this.id = id;
        this.isActive = isActive;
        this.isAgreeTOS = isAgreeTOS;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.profession = profession;
        this.role = role;
        this.username = username;
        this.zipCode = zipCode;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Expense> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<Expense> expenses) {
        this.expenses = expenses;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isAgreeTOS() {
        return isAgreeTOS;
    }

    public void setAgreeTOS(boolean agreeTOS) {
        isAgreeTOS = agreeTOS;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }



    @Override
    public String toString() {
        return "User{" +
                "createdAt=" + createdAt +
                ", id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", profession='" + profession + '\'' +
                ", isAgreeTOS=" + isAgreeTOS +
                ", isActive=" + isActive +
                ", phone='" + phone + '\'' +
                ", expenses=" + expenses +
                '}';
    }
}
