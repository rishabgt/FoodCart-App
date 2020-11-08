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
  }

  getUser() {
    this.user = this.service.getUser();
    this.firstName = this.user.firstname;
  }

  getAddresses() {
    this.service.getAddressByUid(this.user.id).subscribe((data) => {
      this.addresses = data as Address[];
      if (this.addresses.length === 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
      this.isSearching = false;
    });
  }

  selectAddress(item) {
    this.service.setAddress(item);
    this.router.navigate(['/payment']);
  }
}
