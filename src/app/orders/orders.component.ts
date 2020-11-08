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
  foodNames = new Array();
  foodImages = new Array();
  foodPrices = new Array();
  searching: boolean;
  isEmpty: boolean;
  addresses: Address[];
  addFirstName = new Array();
  addLastName = new Array();
  addBuilding = new Array();
  addStreet = new Array();
  addCity = new Array();
  addState = new Array();
  addZip = new Array();
  addLandmark = new Array();
  addPhone = new Array();

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
    this.service.getOrdersByUid(this.user.id).subscribe((data) => {
      this.orders = data as Orders[];
      this.orders.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      if (this.orders.length === 0) {
        this.isEmpty = true;
        this.searching = false;
      } else {
        this.orders.forEach((item) => {
          this.getAddress(item.aid);
          this.getFoodById(item.fid);
        });
      }
    });
  }

  getFoodById(fid) {
    this.service.getFoodById(fid).subscribe((data) => {
      this.foods = data as Foods[];
      this.foodNames.push(this.foods[0].name);
      this.foodImages.push(this.foods[0].image);
      this.foodPrices.push(this.foods[0].price);
    });
  }

  getAddress(aid) {
    this.service.getAddressById(aid).subscribe((data) => {
      this.addresses = data as Address[];

      this.addFirstName.push(this.addresses[0].firstname);
      this.addLastName.push(this.addresses[0].lastname);
      this.addBuilding.push(this.addresses[0].building);
      this.addStreet.push(this.addresses[0].street);
      this.addCity.push(this.addresses[0].city);
      this.addState.push(this.addresses[0].state);
      this.addZip.push(this.addresses[0].zip);
      this.addLandmark.push(this.addresses[0].landmark);
      this.addPhone.push(this.addresses[0].phone);

      this.searching = false;
    });
  }
}
