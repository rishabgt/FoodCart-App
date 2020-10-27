import { Foods } from './../models/foods';
import { Location } from '@angular/common';
import { Orders } from './../models/orders';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  orders: Orders[];
  foods: Foods[];
  food: Foods;
  foodNames = new Array();
  foodImages = new Array();
  foodPrices = new Array();
  searching: boolean;
  orderTotal: number;
  isEmpty: boolean;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private routing: Router
  ) {
    this.searching = true;
    this.isEmpty = false;
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.service.getOrderByUid(1).subscribe((data) => {
      this.orders = data as Orders[];
      this.orders.forEach((item) => {
        this.getFoodById(item.fid);
      });
      this.calculateOrderTotal();
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
    this.orders.forEach((item) => {
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
      this.getOrders();
    });
  }

  decreaseQuantity(item) {
    let updatedOrder = {
      id: item.id,
      quantity: --item.quantity,
    };

    this.service.updateQuantity(updatedOrder).subscribe(() => {
      console.log('Order quantity decreased');
      this.getOrders();
    });
  }

  deleteOrder(item) {
    this.service.deleteOrder(item.id).subscribe(() => {
      this.getOrders();
    });
  }

  placeOrder() {
    this.routing.navigate(['/address']);
  }
}
