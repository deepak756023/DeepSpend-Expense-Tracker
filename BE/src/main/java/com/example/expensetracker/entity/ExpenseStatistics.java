package com.example.expensetracker.entity;

import java.util.List;

public class ExpenseStatistics {

    public ExpenseStatistics() {
    }

    public ExpenseStatistics(double avgExpensesPerMonth, double totalExpenses, List<Expense> list) {
        this.avgExpensesPerMonth = avgExpensesPerMonth;
        this.totalExpenses = totalExpenses;
        this.list = list;
    }

    private double totalExpenses;

    private double avgExpensesPerMonth;

    private List<Expense> list;

    public double getAvgExpensesPerMonth() {
        return avgExpensesPerMonth;
    }

    public List<Expense> getList() {
        return list;
    }

    public double getTotalExpenses() {
        return totalExpenses;
    }

    public void setAvgExpensesPerMonth(double avgExpensesPerMonth) {
        this.avgExpensesPerMonth = avgExpensesPerMonth;
    }

    public void setList(List<Expense> list) {
        this.list = list;
    }

    public void setTotalExpenses(double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    @Override
    public String toString() {
        return "ExpenseStatistics{" +
                "avgExpensesPerMonth=" + avgExpensesPerMonth +
                ", totalExpenses=" + totalExpenses +
                ", list=" + list +
                '}';
    }
}
