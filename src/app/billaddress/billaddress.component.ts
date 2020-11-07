import { ToastrService } from 'ngx-toastr';
import { DataService } from './../services/data.service';
import { Users } from './../models/users';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billaddress',
  templateUrl: './billaddress.component.html',
  styleUrls: ['./billaddress.component.css'],
  animations: [
    trigger('buttonTextStateTrigger', [
      state(
        'shown',
        style({
          opacity: 1,
        })
      ),
      state(
        'transitioning',
        style({
          opacity: 0.5,
        })
      ),
      transition('shown => transitioning', animate('600ms ease-out')),
      transition('transitioning => shown', animate('600ms ease-in')),
    ]),
  ],
})
export class BilladdressComponent implements OnInit {
  user: Users;
  billForm: FormGroup;
  // The current state of text
  buttonTextState = 'shown';
  // The text currently being show
  buttonText = 'Check Out';
  // The text shown when the transition is finished
  transitionButtonText = 'Check Out';

  constructor(
    private service: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUser();

    this.billForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      buildingNo: ['', [Validators.required, Validators.maxLength(30)]],
      streetName: ['', [Validators.required, Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.maxLength(25)]],
      state: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      zipCode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      landmark: ['', [Validators.required]],
      phoneNo: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
    });
  }

  getUser() {
    this.user = this.service.getUser();
    console.log(this.user);
  }

  buttonTextTransitioned(event) {
    this.buttonText = this.transitionButtonText;
    this.buttonTextState = this.buttonTextState = 'shown';
  }

  onCheckOut() {
    // Removing the First transition
    this.buttonTextState = 'transitioning';
    this.transitionButtonText = 'Checking Out...';

    setTimeout(() => {
      this.buttonTextState = 'transitioning';
      this.transitionButtonText = 'Successfully Checked out';
    }, 1800);

    // Reset button text
    setTimeout(() => {
      this.buttonTextState = 'transitioning';
      this.transitionButtonText = 'Check Out';
    }, 3600);
  }

  get f() {
    return this.billForm.controls;
  }

  onSubmit() {
    console.log(this.billForm.value);

    let address = {
      firstname: this.billForm.controls['firstName'].value,
      lastname: this.billForm.controls['lastName'].value,
      building: this.billForm.controls['buildingNo'].value,
      street: this.billForm.controls['streetName'].value,
      city: this.billForm.controls['city'].value,
      state: this.billForm.controls['state'].value,
      zip: this.billForm.controls['zipCode'].value,
      landmark: this.billForm.controls['landmark'].value,
      phone: this.billForm.controls['phoneNo'].value,
      uid: this.user.id,
    };

    this.service.insertAddress(address).subscribe(
      () => {
        this.toastr.success('Address saved!' + '😃');
        console.log('Address inserted');
        this.router.navigateByUrl('/payment');
      },
      (error: any) => {
        this.toastr.error("Couldn't save address!" + '😞');
        console.log(error);
      }
    );
  }
}
