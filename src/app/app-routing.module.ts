import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
