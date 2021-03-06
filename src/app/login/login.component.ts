import { Users } from './../models/users';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPassword } from '../validators/custom.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private _dataService: DataService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.valid = true;
    this.validLoading = false;
    this.userExists = false;
    this.fetching = false;
  }

  get usernameSignUp() {
    return this.signupForm.get('usernameSignUp');
  }
  get passwordSignUp() {
    return this.signupForm.get('passwordSignUp');
  }
  get confirmPasswordSignUp() {
    return this.signupForm.get('confirmPasswordSignUp');
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
  @ViewChild('closeButton') closeButton;
  @ViewChild('load') load;
  @ViewChild('closeLoad') closeLoad;

  fetching: boolean;
  valid: boolean;
  validLoading: boolean;
  credentials: Users;
  user: any;
  userExists: boolean;
  passwordField: boolean;
  passwordSignUpField: boolean;
  confirmPasswordSignUpField: boolean;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  signupForm = new FormGroup(
    {
      usernameSignUp: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordSignUp: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      confirmPasswordSignUp: new FormControl('', [Validators.required]),
    },
    ConfirmPassword.confirmPassword
  );

  ngOnInit(): void {}

  formReset() {
    this.signupForm.reset();
  }

  open(content) {
    this.modalService.open(content);
  }

  create(content) {
    this.open(this.load);
    this.fetching = true;
    console.log(this.signupForm);
    this.user = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      username: this.usernameSignUp.value,
      password: this.passwordSignUp.value,
    };
    this._dataService.insertUser(this.user).subscribe(
      () => {
        this.userExists = false;
        this.open(content);
        console.log(this.user);
      },
      (error: any) => {
        this.userExists = true;
        this.open(content);
      }
    );
    this.fetching = false;
    this.closeButton.nativeElement.click();
    this.signupForm.reset();
    this.closeButton.nativeElement.click();
  }

  closeAllModals() {
    console.log('Yes');
    this.modalService.dismissAll();
  }

  togglePasswordField() {
    this.passwordField = !this.passwordField;
  }

  togglePasswordSignUpField() {
    this.passwordSignUpField = !this.passwordSignUpField;
  }

  toggleConfirmPasswordSignUpField() {
    this.confirmPasswordSignUpField = !this.confirmPasswordSignUpField;
  }

  onSubmit() {
    this.validLoading = true;

    this._dataService.getUserByUsername(this.username).subscribe(
      (data) => {
        this.credentials = data[0];
        // console.log(this.credentials);
        if (this.credentials == undefined) {
          this.valid = false;
          this.validLoading = false;
        } else if (this.credentials.password != this.password) {
          this.valid = false;
          this.validLoading = false;
        } else {
          this._dataService.setUser(this.credentials);
          // console.log(this._dataService.getUserName());
          this.router.navigate(['/home']);
          this._dataService.setLogin();
          this.toastr.success('Logged in successfully!' + '????');
        }
      },
      (error: any) => {
        this.toastr.error('Couldn\'t log in!' + '????');
      }
    );
  }
}
