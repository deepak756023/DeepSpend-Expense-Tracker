import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';
  message: String = '';
  username: String = "";
  isCreatePwd: Boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    const currentRoutePath: string = this.router.url;
    this.checkCurrentPageRoute(currentRoutePath);
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.findUsernameByToken(this.token);
  }

  checkCurrentPageRoute(url: String) {
    if (url && url == "/create-password") {
      this.isCreatePwd = true;
    } else {
      this.isCreatePwd = false;
    }
  }

  findUsernameByToken(token: string) {
    this.http.get<{ data: string }>('http://localhost:8080/findUserNameFromToken', {
      params: { token }
    }).subscribe({
      next: (response) => {
        if (response.data) {
          this.username = response.data;
        }
      },
      error: (err) => {
        console.error('Error fetching username:', err);
      }
    });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match!';
      return;
    }
    this.http.post('http://localhost:8080/auth/reset-password', {
      token: this.token,
      newPassword: this.newPassword
    }).subscribe(() => {
      this.message = 'Password reset successful!';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    });
  }

}
