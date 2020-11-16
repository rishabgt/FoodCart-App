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
    this.setValue();
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
          Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'),
        ]),
      ],
      lastname: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'),
        ]),
      ],
    });
  }

  setValue() {
    this.form.setValue({
      username: this.userName,
      firstname: this.firstName,
      lastname: this.lastName,
    });
  }

  submit(form) {
    console.log(form);

    const updatedUser = {
      id: this.id,
      firstname: this.form.controls.firstname.value,
      lastname: this.form.controls.lastname.value,
      username: this.form.controls.username.value,
    };

    const newUser = {
      id: this.id,
      firstname: this.form.controls.firstname.value,
      lastname: this.form.controls.lastname.value,
      username: this.form.controls.username.value,
      password: this.password,
    };

    this.service.updateUser(updatedUser).subscribe(
      () => {
        this.service.setUser(newUser);
        this.router.navigate(['/restaurants']);
        this.toastr.success('User details updated!' + '😃');
        this.form.reset();
      },
      (error: any) => {
        this.toastr.error('Couldn\'t updated user details!' + '😞');
        this.form.reset();
      }
    );
  }
}
