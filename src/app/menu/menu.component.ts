import { Users } from './../models/users';
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
  user: Users;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.searching = true;
  }

  ngOnInit(): void {
    this.getUser();
    this.getFoods();
    this.getRestaurant();
  }

  getUser() {
    this.user = this.service.getUser();
    console.log(this.user);
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

  addItemToCart(item) {
    let order = {
      quantity: 1,
      fid: item.id,
      uid: this.user.id,
      price: item.price,
    };
    this.service.addItemToCart(order).subscribe(
      () => {
        // console.log('Addedd to cart');
        alert('Item added to cart');
      },
      (error: any) => {
        // console.log(error);
        alert('Item already in cart.');
      }
    );
  }
}
