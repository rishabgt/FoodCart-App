import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'lastpage',
  templateUrl: './lastpage.component.html',
  styleUrls: ['./lastpage.component.css']
})
export class LastpageComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
     
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 4 seconds */
      this.spinner.hide();
    }, 4000);
  }

}
