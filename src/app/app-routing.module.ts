import { LastpageComponent } from './lastpage/lastpage.component';
import { BilladdressComponent } from './billaddress/billaddress.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'restaurants',
    loadChildren: () =>
      import('./restaurants/restaurants.module').then(
        (m) => m.RestaurantsModule
      ),
  },
  { path: 'cart', component: CartComponent },
  {
    path: 'menu/:rid',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
  { path: 'address', component: BilladdressComponent },
  { path: 'thanks', component: LastpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
