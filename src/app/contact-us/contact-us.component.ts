import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  feedbackForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(2500)]],
    });
  }

  get f() {
    return this.feedbackForm.controls;
  }
  onSubmit(): void {
    this.toastr.success('Thankyou for your valuable Feedback' + '😃');
    console.log(this.feedbackForm.value);
  }
}
