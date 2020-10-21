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
    this.getRestaurants();
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
      .pipe(find((item) => item.name === this.searchName))
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
          filter((item) => item.name === this.searchName),
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
