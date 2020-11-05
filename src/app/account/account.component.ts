import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Users } from './../models/users';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  form: FormGroup;
  user: Users;
  firstName: string;
  lastName: string;
  userName: string;
  id: number;
  password: string;

  constructor(
    private service: DataService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.getUser();
  }

  getUser() {
    this.user = this.service.getUser();
    this.id = this.user.id;
    this.firstName = this.user.firstname;
    this.lastName = this.user.lastname;
    this.userName = this.user.username;
    this.password = this.user.password;
  }

  createForm(): FormGroup {
    return this.fb.group({
      username: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
        ]),
      ],
      firstname: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
        ]),
      ],
      lastname: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
        ]),
      ],
    });
  }

  submit(form) {
    console.log(form);

    let updatedUser = {
      id: this.id,
      firstname: this.form.controls['firstname'].value,
      lastname: this.form.controls['lastname'].value,
      username: this.form.controls['username'].value,
    };

    let newUser = {
      id: this.id,
      firstname: this.form.controls['firstname'].value,
      lastname: this.form.controls['lastname'].value,
      username: this.form.controls['username'].value,
      password: this.password,
    };

    this.service.updateUser(updatedUser).subscribe(
      () => {
        this.service.setUser(newUser);
        this.router.navigate(['/restaurants']);
        this.toastr.success('User details updated!');
      },
      (error: any) => {
        this.toastr.error("Couldn't updated user details!");
      }
    );
  }
}
