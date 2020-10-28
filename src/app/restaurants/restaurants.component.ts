import { Users } from './../models/users';
import { Restaurants } from './../models/restaurants';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { from } from 'rxjs';
import { filter, find, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurants[];
  searching: boolean;
  searchName: string;
  isFound: boolean;
  searchIsOn: boolean;
  user: Users;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.searching = true;
    this.searchName = '';
    this.isFound = true;
    this.searchIsOn = false;
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

  search() {
    this.searchIsOn = true;

    let found;
    from(this.restaurants)
      .pipe(
        find(
          (item) => item.name.toLowerCase() === this.searchName.toLowerCase()
        )
      )
      .subscribe((data) => {
        found = data;
      });

    if (this.searchName === '') {
      this.isFound = true;
      this.searchIsOn = false;
    } else if (this.searchName !== '' && found === undefined) {
      this.isFound = false;
    } else {
      from(this.restaurants)
        .pipe(
          filter(
            (item) => item.name.toLowerCase() === this.searchName.toLowerCase()
          ),
          toArray()
        )
        .subscribe((data) => {
          this.restaurants = data;
        });

      this.isFound = true;
    }
    this.searchName = '';
  }

  back() {
    this.searching = true;
    this.getRestaurants();
    this.isFound = true;
    this.searchIsOn = false;
  }

  goBack() {
    this.location.back();
  }
}
