import { Users } from './../models/users';
import { Address } from './../models/address';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  user: Users;
  addresses: Address[];
  isSearching: boolean;
  firstName: string;

  constructor(private service: DataService, private router: Router) {
    this.isSearching = true;
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
      this.isSearching = false;
    });
  }

  address() {
    this.router.navigate(['/address']);
  }

  remove(item) {}
}
