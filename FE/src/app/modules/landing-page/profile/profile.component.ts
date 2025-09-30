import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { FooterComponent } from "../footer/footer.component";
import { User } from '../../user-management/user-management/user-management.component';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Component({
  selector: 'app-profile',
  imports: [TopbarComponent, FooterComponent, NgIf, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  isUpdateMode = false;

  user: User = {};
  backupUser: User = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadUserDetails();
  }

  update() {
    this.backupUser = { ...this.user };
    this.isUpdateMode = true;
  }

  cancel() {
    this.user = { ...this.backupUser };
    this.isUpdateMode = false;
  }

  save() {
    if (!this.user.firstName || this.user.firstName.trim() === "") {
      alert("First name cannot be empty!");
      return;
    }

    const id = localStorage.getItem('user_id');
    const userId = Number(id);

    if (userId) {
      this.http.put<User>(`http://localhost:8080/user/updateUser/${userId}`, this.user)
        .subscribe({
          next: (res) => {
            this.user = res;
            alert("Profile updated successfully!");
            this.isUpdateMode = false;
          },
          error: (err) => {
            console.error("Error updating user:", err);
            alert("Failed to update profile!");
          }
        });
    }
  }

  loadUserDetails() {
    const id = localStorage.getItem('user_id');
    const userId = Number(id);
    if (userId) {
      this.http.get<ApiResponse<User>>(`http://localhost:8080/user/getUser/${userId}`)
        .subscribe({
          next: (res) => this.user = res.data || {},
          error: (err) => console.error("Error fetching user details", err)
        });
    }
  }
}
