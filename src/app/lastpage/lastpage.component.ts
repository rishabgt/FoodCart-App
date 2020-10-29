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

  constructor(
    private service: DataService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 4 seconds */
      this.spinner.hide();
    }, 4000);

    this.getUser();
    this.getItems();
  }

  getUser() {
    this.user = this.service.getUser();
    console.log(this.user);
  }

  getItems() {
    this.service.getItemByUid(this.user.id).subscribe((data) => {
      this.items = data as Items[];
    });
  }

  goBack() {
    var date = new Date();
    let str = date.toDateString();

    this.items.forEach((item) => {
      let order = {
        id: item.id,
        quantity: item.quantity,
        fid: item.fid,
        uid: item.uid,
        price: item.price,
        date: str,
      };
      this.service.addItemToOrders(order).subscribe(() => {
        console.log('Item moved to Orders.');
      });
    });

    this.service.deleteItemByUid(this.user.id).subscribe(() => {
      console.log('Cart cleared.');
    });

    this.route.navigate(['/restaurants']);
  }
}
