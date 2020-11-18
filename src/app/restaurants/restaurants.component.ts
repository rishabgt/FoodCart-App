import { Address } from './../models/address';
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
  isEmpty: boolean;
  userId: number;
  address: Address[];
  currentCity: string;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) {
    this.searching = true;
    this.searchName = '';
    this.searchCity = '';
    this.isEmpty = false;
  }

  ngOnInit(): void {
    this.toastr.info("Current city's restaurants are here!" + '😀');
    this.getUser();
    this.getCurrentAddress();
    this.getCities();
  }

  getUser() {
    this.user = this.service.getUser();
    this.userId = this.service.getIdLocal();
    // console.log(this.user);
  }

  getCurrentAddress() {
    this.service.getAddressByUidAndCurrent(this.userId).subscribe((data) => {
      this.address = data as Address[];
      this.getRestaurants();
    });
  }

  getRestaurants() {
    if (this.address.length === 0) {
      this.service.getRestaurants().subscribe((data) => {
        this.restaurants = data as Restaurants[];
        this.searching = false;
      });
    } else {
      this.currentCity = this.address[0].city;
      this.searchCity = 'Current City: ' + this.address[0].city;

      this.service.getRestaurantByCity(this.currentCity).subscribe((data) => {
        this.restaurants = data as Restaurants[];

        if (this.restaurants.length > 0) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }

        this.searching = false;
      });
    }
  }

  getCities() {
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
          if (this.restaurants.length > 0) {
            this.isEmpty = false;
          } else {
            this.isEmpty = true;
          }
          this.searching = false;
        },
        (error: any) => {
          this.toastr.warning('No restaurants found!');
          this.searching = false;
        }
      );
    }
  }

  back() {
    this.isEmpty = false;
    this.searching = true;
    this.getRestaurants();
  }

  goBack() {
    this.location.back();
  }
}
