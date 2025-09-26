import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { __param } from 'tslib';
import { TopbarComponent } from "../../landing-page/topbar/topbar.component";
import { FooterComponent } from "../../landing-page/footer/footer.component";

@Component({
  selector: 'app-forget-password',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, TopbarComponent, FooterComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  http = inject(HttpClient);
  isEmailSent: boolean = false;
  isErrorOccured: boolean = false;
  successMsg: String = "";
  errorMsg: String = "";
  isLoaderOn: boolean = false;

  forgotPwdForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  })

  public isFormValid() {
    return this.forgotPwdForm.invalid;
  }

  sendResetPwdMail() {
    const formValue = this.forgotPwdForm.value;
    this.errorMsg = "";
    const params = new HttpParams().set('email', formValue.email ?? '');
    this.isLoaderOn = true;
    this.http.get<{ message: string }>(
      'http://localhost:8080/auth/forgot-password',
      { params }
    ).subscribe({
      next: (response) => {
        this.isLoaderOn = false;
        this.isEmailSent = true;
        this.successMsg = response.message;
      },
      error: (err) => {
        this.isLoaderOn = false;
        this.isErrorOccured = true;
        this.errorMsg = err.error?.errorMsg;
      }
    });
  }


}
