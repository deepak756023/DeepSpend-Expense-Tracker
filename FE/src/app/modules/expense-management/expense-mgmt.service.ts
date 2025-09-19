import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from './expense-mgmt/expense-mgmt.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseMgmtService {

  private baseUrl = 'http://localhost:8080/user/api/expenses';

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    const getExpensesApi = `${this.baseUrl}/all-users-expenses`;
    return this.http.get<Expense[]>(getExpensesApi);
  }

  delete(expense: Expense): Observable<any> {
    const deleteExpenseApi = `${this.baseUrl}/delete/${expense.id}`;
    return this.http.delete(deleteExpenseApi);
  }

  deleteSelectedUsers(selectedExpenses: Expense[]): Observable<any> {
    const deleteSelectedExpenseApi = `${this.baseUrl}/deleteSelectedExpenses`;
    const options = {
      body: selectedExpenses,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete(deleteSelectedExpenseApi, options);
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, expense);
  }

  updateExpense(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update?id=${id}`, payload);
  }
}
