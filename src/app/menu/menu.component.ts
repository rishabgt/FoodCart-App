import { Restaurants } from './../models/restaurants';
import { Foods } from './../models/foods';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  foods: Foods[];
  restaurants: Restaurants[];
  currentRestaurant: Restaurants;
  rid: number;
  searching: boolean;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.searching = true;
  }

  ngOnInit(): void {
    this.getFoods();
    this.getRestaurant();
  }

  getFoods() {
    this.rid = +this.route.snapshot.paramMap.get('rid');

    this.service.getFoodsByRid(this.rid).subscribe((data) => {
      this.foods = data as Foods[];
    });
  }

  getRestaurant() {
    this.rid = +this.route.snapshot.paramMap.get('rid');

    this.service.getRestaurantById(this.rid).subscribe((data) => {
      this.restaurants = data as Restaurants[];
      this.currentRestaurant = this.restaurants[0];
      this.searching = false;
    });
  }

  getImgUrl() {
    return "url('" + this.currentRestaurant.image + "')";
  }
}
