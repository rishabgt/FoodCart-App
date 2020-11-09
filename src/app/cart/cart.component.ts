import { ToastrService } from 'ngx-toastr';
import { Items } from './../models/items';
import { Users } from './../models/users';
import { Foods } from './../models/foods';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Items[];
  foods: Foods[];
  food: Foods;
  foodNames;
  foodImages;
  foodPrices;
  searching: boolean;
  orderTotal: number;
  isEmpty: boolean;
  user: Users;

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
    // console.log(this.user);
  }

  getItems() {
    this.foodNames = new Array();
    this.foodImages = new Array();
    this.foodPrices = new Array();

    this.service.getItemByUid(this.user.id).subscribe((data) => {
      this.items = data as Items[];
      this.items.sort((a, b) => a.id - b.id);

      if (this.items.length === 0) {
        this.isEmpty = true;
        this.searching = false;
      } else {
        this.items.forEach((item) => {
          this.getFoodById(item.fid);
        });
        this.calculateOrderTotal();
      }
    });
  }

  getFoodById(fid) {
    this.service.getFoodById(fid).subscribe((data) => {
      this.foods = data as Foods[];
      this.foodNames.push(this.foods[0].name);
      this.foodImages.push(this.foods[0].image);
      this.foodPrices.push(this.foods[0].price);
      this.searching = false;
    });
  }

  calculateOrderTotal() {
    this.orderTotal = 0;
    this.items.forEach((item) => {
      this.orderTotal += item.quantity * item.price;
    });
  }

  increaseQuantity(item) {
    let updatedOrder = {
      id: item.id,
      quantity: ++item.quantity,
    };

    this.service.updateQuantity(updatedOrder).subscribe(() => {
      console.log('Order quantity increased');
      this.getItems();
    });
  }

  decreaseQuantity(item) {
    let updatedOrder = {
      id: item.id,
      quantity: --item.quantity,
    };

    this.service.updateQuantity(updatedOrder).subscribe(() => {
      console.log('Order quantity decreased');
      this.getItems();
    });
  }

  deleteItem(itemId) {
    this.service.deleteItem(itemId).subscribe(() => {
      this.getItems();
      this.toastr.warning('Item deleted!');
    });
  }

  placeOrder() {
    this.routing.navigate(['/address']);
  }
}
