import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { TruncatePipe } from "../../../pipes/string-pipe/truncate.pipe";

@Component({
  selector: 'app-topbar',
  imports: [RouterModule, NgIf, TruncatePipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  firstName: string | null = localStorage.getItem('firstName');
  lastName: string | null = localStorage.getItem('lastName');
  usernameInitials: string | null = (localStorage.getItem('firstName')?.charAt(0) || '') + (localStorage.getItem('lastName')?.charAt(0) || '');


  usertype: string | null = localStorage.getItem('user_role');
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  profile() {
    window.location.href = '/layout/my-profile';
  }

  logout() {
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    localStorage.removeItem('exp');
    window.location.href = '/login';
  }

  userRole(): boolean {
    return localStorage.getItem('user_role') === 'ADMIN' || localStorage.getItem('user_role') === 'USER';
  }

  isAdmin(): boolean {
    return localStorage.getItem('user_role') === 'ADMIN';
  }

}
