package com.example.expensetracker.service;

import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.ExpenseStatistics;
import com.example.expensetracker.exception.custom_exception.NoSuchExpensesExists;
import com.example.expensetracker.repository.ExpenseRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepo expenseRepo;

    public ExpenseService(ExpenseRepo expenseRepo) {
        this.expenseRepo = expenseRepo;
    }

    public Expense add(Expense expense) {
        return this.expenseRepo.save(expense);
    }

    public List<Expense> getAllExpenses(Long id) {
        return this.expenseRepo.findByUserId(id);
    }

    public List<Expense> getAllUsersExpenses() {
        return this.expenseRepo.findAll();
    }

    public Expense updateExpense(Long id, Expense newExpense) {
        Expense expense = expenseRepo.findById(id)
                .orElseThrow(() -> new NoSuchExpensesExists("There is no such expense exists"));

        expense.setCategory(newExpense.getCategory());
        expense.setAmount(newExpense.getAmount());
        expense.setDescription(newExpense.getDescription());
        expense.setExpenseDate(newExpense.getExpenseDate());

        this.expenseRepo.save(expense);
        return expense;
    }


    public Expense deleteExpense(Long id) {
        Expense expense = expenseRepo.findById(id)
                .orElseThrow(() -> new NoSuchExpensesExists("There is no such expense exists"));
        this.expenseRepo.deleteById(id);

        return expense;
    }

    public List<Expense> getFilteredExpenses(Category category, LocalDate startDate, LocalDate endDate) {

        if (category != null && startDate != null && endDate != null) {
            return expenseRepo.findByCategoryAndExpenseDateBetween(category, startDate, endDate);
        }
        else if (category != null && startDate != null) {
            return expenseRepo.findByCategoryAndExpenseDateAfter(category, startDate.minusDays(1));
        }
        else if (category != null && endDate != null) {
            return expenseRepo.findByCategoryAndExpenseDateBefore(category, endDate.plusDays(1));
        }
        else if (category != null) {
            return expenseRepo.findByCategory(category);
        }
        else if (startDate != null && endDate != null) {
            return expenseRepo.findByExpenseDateBetween(startDate, endDate);
        }
        else if (startDate != null) {
            return expenseRepo.findByExpenseDateAfter(startDate.minusDays(1));
        }
        else if (endDate != null) {
            return expenseRepo.findByExpenseDateBefore(endDate.plusDays(1));
        }
        else {
            return expenseRepo.findAll();
        }
    }


    public Map<String, Double> getMonthlyExpensesChart(Long userId, int month, int year) {
        // Suppose you have a method that fetches all expenses
        List<Expense> allExpenses = getAllUsersExpenses();

        return allExpenses.stream()
                .filter(e -> e.getUser().getId().equals(userId))
                .filter(e -> e.getExpenseDate().getMonthValue() == month && e.getExpenseDate().getYear() == year)
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)
                ));

    }

    public Map<Integer, Double> getYearlyExpensesChart(Long userId, int year) {
        List<Expense> allExpenses = getAllUsersExpenses();

        Map<Integer, Double> monthTotals = allExpenses.stream()
                .filter(e -> e.getUser().getId().equals(userId))
                .filter(e -> e.getExpenseDate().getYear() == year)
                .collect(Collectors.groupingBy(
                        e -> e.getExpenseDate().getMonthValue(),
                        Collectors.summingDouble(Expense::getAmount)
                ));

        Map<Integer, Double> result = new LinkedHashMap<>();
        for (int month = 1; month <= 12; month++) {
            result.put(month, monthTotals.getOrDefault(month, 0.0));
        }
        return result;
    }

    public String[] getAllCategories(Long id) {
        List<Expense> expenses = this.expenseRepo.findByUserId(id);
        return expenses.stream()
                .map(Expense::getCategory)
                .distinct()
                .toArray(String[]::new);
    }

    public ExpenseStatistics getExpStatistics(Long userId) {
        ExpenseStatistics expenseStatics = new ExpenseStatistics();
        HashSet<String> set = new HashSet<>();

        List<Expense> expenses = this.expenseRepo.findByUserId(userId);
        double totalAmount = 0.0;
        for(var expense : expenses){
            totalAmount += expense.getAmount();
            String date = expense.getExpenseDate().toString().substring(0, 7);
            set.add(date);
        }

        expenseStatics.setTotalExpenses(totalAmount);
        expenseStatics.setAvgExpensesPerMonth(totalAmount / set.size());

        var topFiveExpenses = expenses.stream()
                .filter(e -> (e.getExpenseDate().getMonthValue() == LocalDate.now().getMonthValue() && e.getExpenseDate().getYear() == LocalDate.now().getYear()))
                .sorted(Comparator.comparing(Expense::getAmount).reversed())
                .limit(5)
                .toList();

        expenseStatics.setList(topFiveExpenses);

        return expenseStatics;

    }

    public Map<String, Double> getDailyExpenses(Long userId, int month, int year) {
        Map<String, Double> dailyExpenseList = new LinkedHashMap<>();

        YearMonth yearMonth = YearMonth.of(year, month);
        int daysInMonth = yearMonth.lengthOfMonth();

        for (int i = 1; i <= daysInMonth; i++) {
            String date = String.format("%04d-%02d-%02d", year, month, i);
            dailyExpenseList.put(date, 0.0);
        }

        List<Expense> expenses = this.expenseRepo.findByUserId(userId);

        for (var expense : expenses) {
            if (expense.getExpenseDate().getMonthValue() == month && expense.getExpenseDate().getYear() == year) {
                String dateStr = expense.getExpenseDate().toString();
                dailyExpenseList.put(dateStr, dailyExpenseList.get(dateStr) + expense.getAmount());
            }
        }

        return dailyExpenseList; // already sorted (1 → n)
    }

}
