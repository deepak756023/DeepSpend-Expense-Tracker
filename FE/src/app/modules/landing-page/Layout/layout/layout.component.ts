import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from "../../topbar/topbar.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { FooterComponent } from "../../footer/footer.component";
import { UserMngmntService } from '../../../user-management/service/user-mngmnt.service';

export interface UserInfo {
  userId?: number;
  username?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  zipCode?: string;
  profession?: string;
  phone?: string;
}

@Component({
  selector: 'app-layout',
  imports: [TopbarComponent, RouterModule, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  user: UserInfo = {};

  constructor(private route: ActivatedRoute, private userMngmntService: UserMngmntService) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['userInfo'];

    localStorage.setItem('user_role', this.user.role ? this.user.role : '');
    localStorage.setItem('firstName', this.user.firstName ? this.user.firstName : '');
    localStorage.setItem('lastName', this.user.lastName ? this.user.lastName : '');
  }


}
