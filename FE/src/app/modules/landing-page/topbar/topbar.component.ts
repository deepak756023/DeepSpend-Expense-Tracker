import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [RouterModule, NgIf],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    window.location.href = '/login';
  }

  userRole(): boolean {
    return localStorage.getItem('user_role') === 'ADMIN' || localStorage.getItem('user_role') === 'USER';
  }

  isAdmin(): boolean {
    return localStorage.getItem('user_role') === 'ADMIN';
  }

}
