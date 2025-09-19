package com.example.expensetracker.controller;

import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.repository.ExpenseRepo;
import com.example.expensetracker.response.ApiResponse;
import com.example.expensetracker.service.ExpenseService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("user/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final ExpenseRepo expenseRepo;
    public ExpenseController(ExpenseService expenseService, ExpenseRepo expenseRepo){
        this.expenseService = expenseService;
        this.expenseRepo = expenseRepo;
    }

    @PostMapping("/add")
    public ApiResponse<Expense> add(@RequestBody Expense expense){
        Expense savedExpense = this.expenseService.add(expense);
        return new ApiResponse<>(201, "Expense added successfully", savedExpense);
    }

    @GetMapping("/all-expenses")
    public ApiResponse<List<Expense>> getAllExpenses(@RequestParam Long id){
        List<Expense> expenses = this.expenseService.getAllExpenses(id);

        return new ApiResponse<>(200, "get all expenses by a particular user", expenses);
    }

    @GetMapping("/all-users-expenses")
    public List<Expense> getAllUsersExpenses(){
        List<Expense> expenses = this.expenseService.getAllUsersExpenses();

        return expenses;
    }

    @PutMapping("/update")
    public ApiResponse<Expense> updateExpense(@RequestParam Long id, @RequestBody Expense newExpense){
        Expense expense = this.expenseService.updateExpense(id, newExpense);
        return new ApiResponse<>(200, "updated the expense", expense);

    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Expense> deleteExpense(@PathVariable Long id){
        Expense expense = this.expenseService.deleteExpense(id);
        return new ApiResponse<>(200, "deleted the expense", expense);

    }

    @DeleteMapping("/deleteSelectedExpenses")
    public ApiResponse<String> deleteSelectedExpenses(@RequestBody List<Expense> expenses) {
        for (Expense expense : expenses) {
            if (expense.getId() != null && this.expenseRepo.existsById(expense.getId())) {
                this.expenseRepo.deleteById(expense.getId());
            }
        }
        return new ApiResponse<>(200, "Selected Expenses deleted successfully", expenses.toString());
    }



    @GetMapping("/expenses-filtration")
    public ApiResponse<List<Expense>> getExpenses(
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<Expense> list = expenseService.getFilteredExpenses(category, startDate, endDate);

        return new ApiResponse<>(200, "get  users expenses by filtering category, expensed date", list);

    }

    @GetMapping("/monthly-expenses-chart")
    public ApiResponse<Map<Category, Double>> getMonthlyExpensesChart(@RequestParam Long userId, @RequestParam int month) {
        Map<Category, Double> chartData = expenseService.getMonthlyExpensesChart(userId, month);
        return new ApiResponse<>(200, "Monthly expenses chart data", chartData);
    }

    @GetMapping("/monthwise-expenses")
    public ApiResponse<Map<Integer, Double>> getYearlyExpensesChart(Long userId){
        Map<Integer, Double> monthlyData = this.expenseService.getYearlyExpensesChart(userId);
        return new ApiResponse<>(200, "Monthly expenses chart data", monthlyData);
    }

}
