import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  valid: boolean;
  validLoading: boolean;
  credentials: any;

  constructor(private _dataService: DataService, private router: Router) {
    this.valid = true;
    this.validLoading = false;
  }

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get username() {
    return this.form.get('username').value;
  }

  get password() {
    return this.form.get('password').value;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.validLoading = true;

    this._dataService.getUserByUsername(this.username).subscribe((data) => {
      this.credentials = data[0];
      // console.log(this.credentials);
      if (this.credentials == undefined) {
        this.valid = false;
        this.validLoading = false;
      } else if (this.credentials['password'] != this.password) {
        this.valid = false;
        this.validLoading = false;
      } else {
        this._dataService.setUserName(this.credentials['username']);
        // console.log(this._dataService.getUserName());
        this.router.navigate(['/home']);
      }
    });
  }
}
