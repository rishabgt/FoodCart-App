import { forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Users } from './../models/users';
import { Address } from './../models/address';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
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
export class AddressComponent implements OnInit {
  user: Users;
  addresses: Address[];
  isSearching: boolean;
  editMode = new Array();
  firstName: string;
  id: number;
  enableAdd: boolean;
  isVisible: boolean;
  billForm: FormGroup;
  addressForm: FormGroup;
  index: number;
  // The current state of text
  buttonTextState = 'shown';
  // The text currently being show
  buttonText = 'Save';
  // The text shown when the transition is finished
  transitionButtonText = 'Save';
  aid: any[];

  constructor(
    private service: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isSearching = true;
    this.enableAdd = false;
    this.isVisible = true;
  }

  ngOnInit(): void {
    this.getUser();
    this.getAddresses();

    this.addressForm = this.formBuilder.group({
      firstName1: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      lastName1: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      buildingNo1: ['', [Validators.required, Validators.maxLength(30)]],
      streetName1: ['', [Validators.required, Validators.maxLength(30)]],
      city1: ['', [Validators.required, Validators.maxLength(25)]],
      state1: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      zipCode1: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      landmark1: ['', [Validators.required]],
      phoneNo1: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
    });

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
    this.firstName = this.service.getFirstName();
  }

  getAddresses() {
    this.aid = new Array();

    this.service
      .getAddressByUid(this.service.getIdLocal())
      .subscribe((data) => {
        this.addresses = data as Address[];
        this.addresses.sort((a, b) => a.id - b.id);

        this.addresses.forEach((item) => {
          this.aid.push(item.id);
        });

        this.isSearching = false;
      });
  }

  address() {
    this.enableAdd = true;
    this.isVisible = false;
    // this.router.navigate(['/address']);
  }

  edit(itemId, ind) {
    this.editMode[ind] = true;
    this.index = ind;
    this.id = itemId;
  }

  remove(item) {
    this.service.deleteAddressById(item.id).subscribe(() => {
      this.toastr.warning('Address deleted!');
      this.getAddresses();
    });
  }

  buttonTextTransitioned(event) {
    this.buttonText = this.transitionButtonText;
    this.buttonTextState = this.buttonTextState = 'shown';
  }

  onCheckOut() {
    // Removing the First transition
    this.buttonTextState = 'transitioning';
    this.transitionButtonText = 'Saving...';

    setTimeout(() => {
      this.buttonTextState = 'transitioning';
      this.transitionButtonText = 'Successfully Saved';
    }, 1800);

    // Reset button text
    setTimeout(() => {
      this.buttonTextState = 'transitioning';
      this.transitionButtonText = 'Save';
    }, 3600);
  }

  get f() {
    return this.billForm.controls;
  }

  get aF() {
    return this.addressForm.controls;
  }

  submit() {
    console.log(this.addressForm.value);

    let newAddress = {
      firstname: this.addressForm.controls['firstName1'].value,
      lastname: this.addressForm.controls['lastName1'].value,
      building: this.addressForm.controls['buildingNo1'].value,
      street: this.addressForm.controls['streetName1'].value,
      city: this.addressForm.controls['city1'].value,
      state: this.addressForm.controls['state1'].value,
      zip: this.addressForm.controls['zipCode1'].value,
      landmark: this.addressForm.controls['landmark1'].value,
      phone: this.addressForm.controls['phoneNo1'].value,
      current: 'no',
      uid: this.user.id,
    };

    this.service.insertAddress(newAddress).subscribe(
      () => {
        this.getAddresses();
        this.toastr.success('Address saved!' + '😃');
        // console.log('Address inserted');
        this.isVisible = true;
        this.enableAdd = false;
      },
      (error: any) => {
        this.toastr.error("Couldn't save address!" + '😞');
        // console.log(error);
      }
    );
  }

  cancel() {
    this.isVisible = true;
    this.enableAdd = false;
  }

  cancelEdit(ind) {
    this.editMode[ind] = false;
  }

  onSubmit() {
    console.log(this.billForm.value);

    let address = {
      id: this.id,
      firstname: this.billForm.controls['firstName'].value,
      lastname: this.billForm.controls['lastName'].value,
      building: this.billForm.controls['buildingNo'].value,
      street: this.billForm.controls['streetName'].value,
      city: this.billForm.controls['city'].value,
      state: this.billForm.controls['state'].value,
      zip: this.billForm.controls['zipCode'].value,
      landmark: this.billForm.controls['landmark'].value,
      phone: this.billForm.controls['phoneNo'].value,
    };

    this.service.updateAddress(address).subscribe(
      () => {
        this.toastr.success('Address updated!');
        this.editMode[this.index] = false;
        this.getAddresses();
      },
      (error: any) => {
        this.toastr.error("Couldn't update address!");
      }
    );
  }

  markCurrent(el) {
    this.isSearching = true;

    let observables = this.aid.map((addId) =>
      this.service.getAddressById(addId)
    );

    forkJoin(observables).subscribe((data) => {
      // console.log(data);
      data.forEach((elem) => {
        if (elem[0].id === el.id) {
          let addr = {
            id: elem[0].id,
            current: 'yes',
          };

          this.service.updateCurrentAddress(addr).subscribe(
            () => {
              this.toastr.success('Changed current address!' + '😃');
              // console.log('Changed current');
            },
            (error: any) => {
              this.toastr.error("Couldn't change current address!" + '😞');
              // console.log(error);
            }
          );
        } else {
          let addr = {
            id: elem[0].id,
            current: 'no',
          };

          this.service.updateCurrentAddress(addr).subscribe(
            () => {
              // console.log('Removed current');
            },
            (error: any) => {
              // console.log(error);
            }
          );
        }
      });

      this.getAddresses();
    });
  }
}
