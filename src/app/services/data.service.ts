import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://foodcart11.000webhostapp.com/';

  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http.get(this.url + 'index.php');
  }

  getRestaurantById(id: number) {
    return this.http.get(this.url + 'getRestaurantById.php?id=' + id);
  }

  getFoodsByRid(rid: number) {
    return this.http.get(this.url + 'getFoodsByRid.php?rid=' + rid);
  }

  addItemToCart(resource) {
    return this.http.post(
      this.url + 'insertItemToCart.php',
      JSON.stringify(resource)
    );
  }
}
