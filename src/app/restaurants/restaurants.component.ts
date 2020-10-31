import { Users } from './../models/users';
import { Restaurants } from './../models/restaurants';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurants[];
  searching: boolean;
  searchName: string;
  user: Users;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.searching = true;
    this.searchName = '';
  }

  ngOnInit(): void {
    this.getUser();
    this.getRestaurants();
  }

  getUser() {
    this.user = this.service.getUser();
    console.log(this.user);
  }

  getRestaurants() {
    this.service.getRestaurants().subscribe((data) => {
      this.restaurants = data as Restaurants[];
      this.searching = false;
    });
  }

  goBack() {
    this.location.back();
  }
}
