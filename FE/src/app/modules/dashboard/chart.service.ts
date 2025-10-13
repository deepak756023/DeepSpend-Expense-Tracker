import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {


  private baseUrl = 'http://localhost:8080/user/api/expenses';
  constructor(private http: HttpClient) { }

  getAllCategories(userId: number): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/all-categories?userId=${userId}`);
  }

  getMonthlyExpensesChart(userId: number, month: number, year: number): Observable<ApiResponse<{ [key: string]: number }>> {
    return this.http.get<ApiResponse<{ [key: string]: number }>>(
      `${this.baseUrl}/monthly-expenses-chart?userId=${userId}&month=${month}&year=${year}`
    );
  }

  getYearlyExpensesChart(userId: number, year: number): Observable<ApiResponse<{ [key: string]: number }>> {
    return this.http.get<ApiResponse<{ [key: string]: number }>>(
      `${this.baseUrl}/monthwise-expenses?userId=${userId}&year=${year}`
    );
  }


}
