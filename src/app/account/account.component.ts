import { Users } from './../models/users';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: Users;
  firstName: string;
  lastName: string;
  userName: string;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.service.getUser();
    this.firstName = this.user.firstname;
    this.lastName = this.user.lastname;
    this.userName = this.user.username;
  }
}
