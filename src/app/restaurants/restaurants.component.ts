import { ToastrService } from 'ngx-toastr';
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
  arr: any[];
  cities: any[];
  searchCity: string;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) {
    this.searching = true;
    this.searchName = '';
    this.searchCity = '';
  }

  ngOnInit(): void {
    this.getUser();
    this.getRestaurants();
  }

  getUser() {
    this.user = this.service.getUser();
    // console.log(this.user);
  }

  getRestaurants() {
    this.arr = new Array();
    this.cities = new Array();

    this.service.getRestaurants().subscribe((data) => {
      this.restaurants = data as Restaurants[];
      this.restaurants.forEach((item) => {
        this.arr.push(item.city);
      });
      this.cities = [...new Set(this.arr)];
      this.searching = false;
    });
  }

  setCity() {
    if (this.searchCity === '') {
      this.getRestaurants();
    } else {
      // console.log(this.searchCity);

      this.searching = true;
      this.service.getRestaurantByCity(this.searchCity).subscribe(
        (data) => {
          this.restaurants = data as Restaurants[];
          this.searching = false;
        },
        (error: any) => {
          this.toastr.warning('No restaurants found!');
          this.searching = false;
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }
}
