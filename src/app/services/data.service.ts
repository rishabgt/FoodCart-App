import { Users } from './../models/users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://foodcart11.000webhostapp.com/';
  private user: Users;

  constructor(private http: HttpClient) {}

  getUser() {
    return this.user;
  }

  setUser(resource) {
    this.user = resource;
  }

  getUserByUsername(username: string) {
    return this.http.get(
      this.url + 'getUserByUsername.php?username=' + username
    );
  }

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

  insertUser(user) {
    return this.http.post(this.url + 'insertUser.php', JSON.stringify(user));
  }

  getOrderByUid(uid: number) {
    return this.http.get(this.url + 'getOrderByUid.php?uid=' + uid);
  }

  getFoodById(id: number) {
    return this.http.get(this.url + 'getFoodById.php?id=' + id);
  }

  updateQuantity(resource) {
    return this.http.post(
      this.url + 'updateQuantity.php',
      JSON.stringify(resource)
    );
  }

  deleteOrder(id: number) {
    return this.http.get(this.url + 'deleteOrder.php?id=' + id);
  }
}
