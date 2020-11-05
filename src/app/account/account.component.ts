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

  constructor(private service: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.getUser();
  }

  getUser() {
    this.user = this.service.getUser();
    this.firstName = this.user.firstname;
    this.lastName = this.user.lastname;
    this.userName = this.user.username;
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
  }
}
