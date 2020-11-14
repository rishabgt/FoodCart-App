import { forkJoin } from 'rxjs';
import { Address } from './../models/address';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './../services/data.service';
import { Users } from './../models/users';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billaddress',
  templateUrl: './billaddress.component.html',
  styleUrls: ['./billaddress.component.css'],
})
export class BilladdressComponent implements OnInit {
  user: Users;
  addresses: Address[];
  isSearching: boolean;
  isEmpty: boolean;
  firstName: string;
  id: number;
  rid: any[];
  resCity: string[];
  userId: number;
  userCity: string;

  constructor(
    private service: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isSearching = true;
    this.isEmpty = false;
  }

  ngOnInit(): void {
    this.getUser();
    this.getAddresses();
    this.getRid();
  }

  getUser() {
    this.user = this.service.getUser();
    this.userId = this.service.getIdLocal();
    this.firstName = this.service.getFirstName();
  }

  getAddresses() {
    this.service.getAddressByUidAndCurrent(this.userId).subscribe((data) => {
      this.addresses = data as Address[];
      if (this.addresses.length === 0) {
        this.isEmpty = true;
      } else {
        this.userCity = this.addresses[0].city;
        this.isEmpty = false;
      }
      this.isSearching = false;
    });
  }

  getRid() {
    this.rid = new Array();
    this.resCity = new Array<string>();

    this.rid = this.service.getRid();

    let observables = this.rid.map((resId) =>
      this.service.getRestaurantById(resId)
    );

    forkJoin(observables).subscribe((data) => {
      console.log(data);

      data.forEach((el) => {
        this.resCity.push(el[0].city);
      });
    });
  }

  selectAddress(item) {
    this.service.setAddress(item);

    if (this.resCity.every((item) => item === this.userCity)) {
      this.router.navigate(['/payment']);
    } else {
      this.toastr.error(
        'Items cannot be ordered from & delivered to a different city!'
      );
    }
  }

  goToAddress() {
    this.router.navigate(['/myaddress']);
  }
}
