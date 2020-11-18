import { Items } from './../models/items';
import { Address } from './../models/address';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './../services/data.service';
import { Users } from './../models/users';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  creditForm: FormGroup;
  user: Users;
  items: Items[];
  address: Address;
  userId: number;

  constructor(
    private service: DataService,
    private formBuilder: FormBuilder,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAddress();
    this.getItems();

    this.creditForm = this.formBuilder.group({
      creditOwner: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      creditNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{12}(?:[0-9]{4})?$')],
      ],
      expirationMonth: [
        '',
        [Validators.required, Validators.pattern('(0?[1-9]|1[012])$')],
      ],
      expirationYear: [
        '',
        [Validators.required, Validators.pattern('^([0-9]{2})$')],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^([0-9]{3})$')]],
    });
  }

  get f() {
    return this.creditForm.controls;
  }

  getUser() {
    this.user = this.service.getUser();
    this.userId = this.service.getIdLocal();
  }

  getAddress() {
    this.address = this.service.getAddress();
  }

  getItems() {
    this.service.getItemByUid(this.userId).subscribe((data) => {
      this.items = data as Items[];
    });
  }

  proceedPayment() {
    const date = new Date();
    const str = date.toDateString();

    this.items.forEach((item) => {
      const order = {
        quantity: item.quantity,
        fid: item.fid,
        uid: item.uid,
        price: item.price,
        date: str,
        aid: this.address.id,
      };
      this.service.addItemToOrders(order).subscribe(
        () => {
          this.toastr.success('Order placed!.' + '😃');
          // console.log('Item moved to Orders.');
        },
        (error: any) => {
          this.toastr.error("Couldn't place order!" + '😞');
        }
      );
    });

    this.service.deleteItemByUid(this.userId).subscribe(() => {
      this.toastr.success('View details in Orders.');
      // console.log('Cart cleared.');
    });

    this.route.navigate(['/thanks']);
  }
}
