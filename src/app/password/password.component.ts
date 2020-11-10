import { ToastrService } from 'ngx-toastr';
import { Users } from './../models/users';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  user: Users;
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  isMatching: boolean;
  oldPasswordField: boolean;
  newPasswordField: boolean;
  confirmPasswordField: boolean;

  constructor(
    private service: DataService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isMatching = true;
  }

  ngOnInit(): void {
    this.getUser();
    this.form = this.createForm();
  }

  getUser() {
    this.user = this.service.getUser();
    this.id = this.service.getIdLocal();
    this.firstName = this.service.getFirstName();
    this.lastName = this.service.getLastName();
    this.userName = this.service.getUserLocal();
    // console.log('username');
    this.password = this.service.getPasswordLocal();
  }

  createForm(): FormGroup {
    return this.fb.group(
      {
        oldpassword: [null, Validators.compose([Validators.required])],
        newpassword: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true,
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true,
              }
            ),
            Validators.minLength(8),
          ]),
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  toggleoldPasswordField() {
    this.oldPasswordField = !this.oldPasswordField;
  }

  togglenewPasswordField() {
    this.newPasswordField = !this.newPasswordField;
  }

  toggleconfirmPasswordField() {
    this.confirmPasswordField = !this.confirmPasswordField;
  }

  submit(form) {
    console.log(form);

    if (this.form.controls['oldpassword'].value !== this.password) {
      this.isMatching = false;
    } else {
      this.isMatching = true;

      let updatedPassword = {
        id: this.id,
        password: this.form.controls['confirmPassword'].value,
      };

      let newUser = {
        id: this.id,
        firstname: this.firstName,
        lastname: this.lastName,
        username: this.userName,
        password: this.form.controls['confirmPassword'].value,
      };

      this.service.updatePassword(updatedPassword).subscribe(
        () => {
          this.service.setUser(newUser);
          this.router.navigate(['/password']);
          this.toastr.success('Password changed!' + '😃');
          this.form.reset();
        },
        (error: any) => {
          this.toastr.error("Couldn't change password!" + '😞');
          this.form.reset();
        }
      );
    }
  }
}
