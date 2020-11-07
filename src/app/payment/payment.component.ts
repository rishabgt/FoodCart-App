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

  constructor(
    private service: DataService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.creditForm = this.formBuilder.group({
      creditOwner: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      creditNumber: ['', [Validators.required]],
      expirationMonth: ['', [Validators.required]],
      expirationYear: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
    });
  }

  get f() {
    return this.creditForm.controls;
  }

  getUser() {
    this.user = this.service.getUser();
  }

  proceedPayment() {
    this.route.navigate(['/thanks']);
  }
}
