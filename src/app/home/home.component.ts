import { DataService } from './../services/data.service';
import { Users } from './../models/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: Users;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.service.getUser();
  }

  // getImgUrl() {
  //   return "url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')";
  // }
}
