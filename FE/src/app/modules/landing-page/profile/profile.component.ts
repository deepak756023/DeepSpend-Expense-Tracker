import { Component, OnInit } from '@angular/core';
import { User } from '../../user-management/user-management/user-management.component';
import { HttpClient } from '@angular/common/http';
import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgImportsModule } from '../../../ngimports';
import { Toast } from "primeng/toast";

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Component({
  selector: 'app-profile',
  imports: [NgIf, FormsModule, DatePipe, Toast],
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  isUpdateMode = false;

  user: User = {};
  backupUser: User = {};
  activeTab: string = 'Overview';
  userRole: string;



  constructor(private http: HttpClient, private messageService: MessageService,) {
    this.userRole = localStorage.getItem('user_role') || '';

  }

  ngOnInit() {
    this.loadUserDetails();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
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
    // Validate first name
    if (!this.user.firstName || this.user.firstName.trim() === "") {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'First name cannot be empty!',
        life: 3000
      });
      return;
    }

    const id = localStorage.getItem('user_id');
    const userId = Number(id);

    if (userId) {
      this.http.put<User>(`http://localhost:8080/user/updateUser/${userId}`, this.user)
        .subscribe({
          next: (res) => {
            this.user = res;

            // Update localStorage
            localStorage.setItem("firstName", this.user.firstName || '');
            localStorage.setItem("lastName", this.user.lastName || '');

            this.isUpdateMode = false;

            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Profile updated successfully!',
              life: 3000
            });

            // Optionally reload page if needed
            // location.reload();
          },
          error: (err) => {
            console.error("Error updating user:", err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update profile!',
              life: 3000
            });
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
