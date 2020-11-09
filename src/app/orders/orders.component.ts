import { forkJoin } from 'rxjs';
import { Address } from './../models/address';
import { Foods } from './../models/foods';
import { DataService } from './../services/data.service';
import { Orders } from './../models/orders';
import { Users } from './../models/users';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  user: Users;
  orders: Orders[];
  foods: Foods[];
  food: Foods;
  searching: boolean;
  isEmpty: boolean;
  address: Address;
  addresses: Address[];
  fid: any[];
  aid: any[];

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
    this.getUser();
    this.getOrders();
  }

  getUser() {
    this.user = this.service.getUser();
  }

  getOrders() {
    this.aid = new Array();
    this.fid = new Array();
    this.addresses = new Array<Address>();
    this.foods = new Array<Foods>();

    this.service.getOrdersByUid(this.user.id).subscribe((data) => {
      this.orders = data as Orders[];
      this.orders.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

      if (this.orders.length === 0) {
        this.isEmpty = true;
        this.searching = false;
      } else {
        this.orders.forEach((item) => {
          this.aid.push(item.aid);
          this.fid.push(item.fid);
        });

        let addr = this.aid.map((addId) => this.service.getAddressById(addId));

        let observables = this.fid.map((foodId) =>
          this.service.getFoodById(foodId)
        );

        forkJoin(addr).subscribe((data) => {
          // console.log(data);
          data.forEach((el) => {
            this.addresses.push(el[0]);
            // console.log(this.foods);
          });
          this.searching = false;
        });

        forkJoin(observables).subscribe((data) => {
          // console.log(data);
          data.forEach((el) => {
            this.foods.push(el[0]);
            // console.log(this.foods);
          });
          this.searching = false;
        });
      }
    });
  }

  getFoodById(fid) {
    this.service.getFoodById(fid).subscribe((data) => {
      this.food = data as Foods;
      this.foods.push(this.food[0]);
    });
  }

  getAddress(aid) {
    this.service.getAddressById(aid).subscribe((data) => {
      this.address = data as Address;
      this.addresses.push(this.address[0]);
      this.searching = false;
    });
  }
}
