import { OrdersComponent } from './orders/orders.component';
import { LastpageComponent } from './lastpage/lastpage.component';
import { BilladdressComponent } from './billaddress/billaddress.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Authguard } from './services/authguard.service';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [Authguard] },
  {
    path: 'restaurants',
    loadChildren: () =>
      import('./restaurants/restaurants.module').then(
        (m) => m.RestaurantsModule
      ),
    canActivate: [Authguard],
  },
  { path: 'cart', component: CartComponent, canActivate: [Authguard] },
  {
    path: 'menu/:rid',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
    canActivate: [Authguard],
  },
  {
    path: 'address',
    component: BilladdressComponent,
    canActivate: [Authguard],
  },
  { path: 'thanks', component: LastpageComponent, canActivate: [Authguard] },
  { path: 'orders', component: OrdersComponent, canActivate: [Authguard] },
  { path: 'account', component: AccountComponent, canActivate: [Authguard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
