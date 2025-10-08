import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  http = inject(HttpClient);
  successMsg: String = "";
  errorMsg: String = "";
  isError: boolean = false;
  isSuccess: boolean = false;
  isSpinnerOn: boolean = false;
  // userObj: any = {
  //   "firstName": "",
  //   "lastName": "",
  //   "mailId": "",
  //   "isActive": true,
  //   "createdOn": new Date(),
  //   "createdBy": "own",
  //   "updatedOn": new Date(),
  //   "updatedBy": "",
  //   "password": ""
  // }

  //Reactive Form with Validation
  useForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl(""),
    username: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    zipCode: new FormControl(""),
    profession: new FormControl(""),
    createdAt: new FormControl(new Date()),
    isAgreeTOS: new FormControl("", [Validators.requiredTrue]),
    password: new FormControl(""),
    isActive: new FormControl(true)

  });

  constructor() { }

  public isFormValid() {
    return this.useForm.invalid;
  }


  showError(errorMsg: String) {
    this.errorMsg = errorMsg;
    this.isError = true;
    setTimeout(() => {
      this.errorMsg = "";
      this.isError = false;
    }, 4000);
  }


  showSuccess(successMsg: String) {
    this.successMsg = successMsg;
    this.isSuccess = true;
    setTimeout(() => {
      this.successMsg = "";
      this.isSuccess = false;
    }, 2000);
  }

  registerUser() {
    const formValue = { ...this.useForm.value };
    console.log(formValue.isActive);
    this.useForm.reset();
    this.isSpinnerOn = true;
    this.http.post("http://localhost:8080/auth/register", formValue).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.isSpinnerOn = false;
          this.showSuccess(response.message);
        }
      },
      error: (err) => {
        this.isSpinnerOn = false;
        this.showError(err.error.errorMsg);
      }
    });
  }


}
