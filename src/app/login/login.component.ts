import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  valid: boolean;
  validLoading: boolean;
  credentials: any;
  user: any;
  constructor(private _dataService: DataService, private router: Router) {
    this.valid = true;
    this.validLoading = false;
  }

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  signupForm = new FormGroup({
    usernameSignUp: new FormControl('', Validators.required),
    passwordSignUp: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
  });

  get usernameSignUp() {
    return this.signupForm.get('usernameSignUp');
  }
  get passwordSignUp() {
    return this.signupForm.get('passwordSignUp');
  }
  get firstname() {
    return this.signupForm.get('firstname');
  }
  get lastname() {
    return this.signupForm.get('lastname');
  }

  get username() {
    return this.form.get('username').value;
  }

  get password() {
    return this.form.get('password').value;
  }

  ngOnInit(): void {}
  create() {
    this.user = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      username: this.usernameSignUp.value,
      password: this.passwordSignUp.value,
    };
    this._dataService.insertUser(this.user).subscribe(() => {
      alert('Sign up successful!!');
    });
  }
  onSubmit() {
    this.validLoading = true;

    this._dataService.getUserByUsername(this.username).subscribe((data) => {
      this.credentials = data[0];
      // console.log(this.credentials);
      if (this.credentials == undefined) {
        this.valid = false;
        this.validLoading = false;
      } else if (this.credentials['password'] != this.password) {
        this.valid = false;
        this.validLoading = false;
      } else {
        this._dataService.setUserName(this.credentials['username']);
        // console.log(this._dataService.getUserName());
        this.router.navigate(['/home']);
      }
    });
  }
}
