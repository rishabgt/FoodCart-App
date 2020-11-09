import { Users } from './../models/users';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  user: Users;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.service.getUser();
  }

  onSubscribe() {}
}
