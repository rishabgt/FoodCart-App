import { DataService } from './../services/data.service';
import { Users } from './../models/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: Users;
  firstName: string;
  lastName: string;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.getUSer();
  }

  getUSer() {
    this.user = this.service.getUser();
    this.firstName = this.user.firstname;
    this.lastName = this.user.lastname;
  }
}
