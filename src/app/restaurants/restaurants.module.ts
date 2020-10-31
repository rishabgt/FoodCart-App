import { FilterNamePipe } from './pipes/filter-name.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { CarouselComponent } from './carousel/carousel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    RestaurantsComponent,
    CarouselComponent,
    NavbarComponent,
    FooterComponent,
    FilterNamePipe,
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class RestaurantsModule {}

export { DataService };
