import { ToastrService } from 'ngx-toastr';
import { Address } from './../models/address';
import { Items } from './../models/items';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Users } from './../models/users';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'lastpage',
  templateUrl: './lastpage.component.html',
  styleUrls: ['./lastpage.component.css'],
})
export class LastpageComponent implements OnInit {
  user: Users;
  items: Items[];
  address: Address;

  constructor(
    private service: DataService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 4 seconds */
      this.spinner.hide();
    }, 4000);

    this.getUser();
  }

  getUser() {
    this.user = this.service.getUser();
    // console.log(this.user);
  }

  goBack() {
    this.route.navigate(['/restaurants']);
  }
}
