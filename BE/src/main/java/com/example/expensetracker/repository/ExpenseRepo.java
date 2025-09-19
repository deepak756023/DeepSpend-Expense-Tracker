package com.example.expensetracker.repository;

import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ExpenseRepo extends JpaRepository<Expense, Long> {


    List<Expense> findByUserId(Long id);

    List<Expense> findByCategory(Category category);
    List<Expense> findByCategoryAndExpenseDateAfter(Category category, LocalDate startDate);
    List<Expense> findByExpenseDateAfter(LocalDate startDate);
    List<Expense> findByExpenseDateBefore(LocalDate endDate);
    List<Expense> findByCategoryAndExpenseDateBefore(Category category, LocalDate localDate);
    List<Expense> findByExpenseDateBetween(LocalDate startDate, LocalDate endDate);
    List<Expense> findByCategoryAndExpenseDateBetween(Category category, LocalDate startDate, LocalDate endDate);
}
