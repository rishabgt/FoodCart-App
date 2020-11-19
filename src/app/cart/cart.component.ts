import { Restaurants } from './../models/restaurants';
import { ToastrService } from 'ngx-toastr';
import { Items } from './../models/items';
import { Users } from './../models/users';
import { Foods } from './../models/foods';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Items[];
  foods: Foods[];
  food: Foods[];
  restaurants: Restaurants[];
  fid: any[];
  rid: any[];
  searching: boolean;
  orderTotal: number;
  isEmpty: boolean;
  user: Users;
  userId: number;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private routing: Router,
    private toastr: ToastrService
  ) {
    this.searching = true;
    this.isEmpty = false;
  }

  ngOnInit(): void {
    this.getUser();
    this.getItems();
  }

  getUser() {
    this.user = this.service.getUser();
    this.userId = this.service.getIdLocal();
    // console.log(this.user);
  }

  getItems() {
    this.foods = new Array<Foods>();
    this.fid = new Array();
    this.rid = new Array();
    this.restaurants = new Array<Restaurants>();

    this.service.getItemByUid(this.userId).subscribe((data) => {
      this.items = data as Items[];
      this.items.sort((a, b) => a.id - b.id);

      if (this.items.length === 0) {
        this.isEmpty = true;
        this.searching = false;
      } else {
        this.items.forEach((item) => {
          this.fid.push(item.fid);
        });

        const observables = this.fid.map((foodId) =>
          this.service.getFoodById(foodId)
        );

        forkJoin(observables).subscribe((data) => {
          // console.log(data);
          data.forEach((el) => {
            this.foods.push(el[0]);
            this.rid.push(el[0].rid);
            // console.log(this.foods);
          });

          const obsvRes = this.rid.map((resId) =>
            this.service.getRestaurantById(resId)
          );

          forkJoin(obsvRes).subscribe((dataRes) => {
            // console.log(data);
            dataRes.forEach((elem) => {
              this.restaurants.push(elem[0]);
            });

            this.searching = false;
          });

          this.service.setRid(this.rid);
        });

        this.calculateOrderTotal();
      }
    });
  }

  calculateOrderTotal() {
    this.orderTotal = 0;
    this.items.forEach((item) => {
      this.orderTotal += item.quantity * item.price;
    });
  }

  increaseQuantity(item) {
    const updatedOrder = {
      id: item.id,
      quantity: ++item.quantity,
    };

    this.service.updateQuantity(updatedOrder).subscribe(() => {
      // console.log('Order quantity increased');
      // this.searching = true;
      // this.getItems();
      this.calculateOrderTotal();
    });
  }

  decreaseQuantity(item) {
    const updatedOrder = {
      id: item.id,
      quantity: --item.quantity,
    };

    this.service.updateQuantity(updatedOrder).subscribe(() => {
      // console.log('Order quantity decreased');
      // this.searching = true;
      // this.getItems();
      this.calculateOrderTotal();
    });
  }

  deleteItem(itemId) {
    this.service.deleteItem(itemId).subscribe(() => {
      this.toastr.warning('Item deleted!');
      this.searching = true;
      this.getItems();
    });
  }

  placeOrder() {
    this.routing.navigate(['/address']);
  }
}
