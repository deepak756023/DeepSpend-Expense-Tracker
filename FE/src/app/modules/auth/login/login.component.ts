import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { TopbarComponent } from "../../landing-page/topbar/topbar.component";
import { FooterComponent } from "../../landing-page/footer/footer.component";

export interface JwtPayload {
  id: number;
  role: string;
  sub: string;
  iat: number;
  exp: number;
}


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TopbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  visiblePassword: boolean = false;
  passwordType: String = "password";
  jwtToken: String = "";
  successMsg: String = "";
  errorMsg: String = "";
  isError: boolean = false;
  isSuccess: boolean = false;
  http = inject(HttpClient);

  showError(errorMsg: String) {
    this.errorMsg = errorMsg;
    this.isError = true;
    setTimeout(() => {
      this.errorMsg = "";
      this.isError = false;
    }, 2000);
  }


  showSuccess(successMsg: String) {
    this.successMsg = successMsg;
    this.isSuccess = true;
    setTimeout(() => {
      this.successMsg = "";
      this.isSuccess = false;
      this.router.navigate(['/home']);
    }, 500);
  }



  //Reactive Form with Validation
  useForm: FormGroup = new FormGroup({
    userMail: new FormControl("", [Validators.required, Validators.email]),
    pwd: new FormControl("", [Validators.required])
  })

  constructor(private router: Router) {
    console.log("Inside Constructor");
  }

  ngOnInit(): void {
  }

  isVisible() {
    this.visiblePassword = !this.visiblePassword;
    if (this.visiblePassword == true)
      this.passwordType = "text";
    else
      this.passwordType = "password";
  }

  // needs to change
  login() {
    const formValue = this.useForm.value;

    const params = {
      username: formValue.userMail,
      password: formValue.pwd
    };

    this.http.post("http://localhost:8080/auth/login", {}, { params })
      .subscribe({
        next: (response: any) => {
          console.log("Login success:", response);
          if (response.data) {
            localStorage.setItem("jwtToken", response.data);

            const decoded = jwtDecode<JwtPayload>(response.data);
            localStorage.setItem("user_id", decoded.id.toString());
            localStorage.setItem("user_role", decoded.role);
            localStorage.setItem("exp", decoded.exp.toString());

            this.showSuccess(response.message);
          }
        },
        error: (err) => {
          this.showError(err.error.errorMsg);
        }
      }
      );
  }

}
