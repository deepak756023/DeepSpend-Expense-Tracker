import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user-management/user-management.component';
import { Observable } from 'rxjs';
import { UserInfo } from '../../landing-page/Layout/layout/layout.component';

@Injectable({
  providedIn: 'root',
})
export class UserMngmntService {
  private baseUrl = 'http://localhost:8080';

  private getAllUsersApi = `${this.baseUrl}/admin/getAllUsers`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUsersApi);
  }

  updateUser(user: User): Observable<User> {
    const updateUserApi = `${this.baseUrl}/user/updateUser/${user.id}`;
    return this.http.put<User>(updateUserApi, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  delete(user: User): Observable<any> {
    const deleteUserApi = `${this.baseUrl}/admin/deleteUser/${user.username}`;
    return this.http.delete<any>(deleteUserApi);
  }

  deleteSelectedUsers(users: User[]): Observable<any> {
    const deleteSelectedUserApi = `${this.baseUrl}/admin/deleteSelectedUsers`;
    return this.http.request<any>('delete', deleteSelectedUserApi, {
      body: users,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  userInfo(userId: number): Observable<UserInfo> {
    const userInfoApi = `${this.baseUrl}/user/userinfo/${userId}`;
    return this.http.get<UserInfo>(userInfoApi);
  }
}
