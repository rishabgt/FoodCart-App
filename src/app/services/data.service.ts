import { Users } from './../models/users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://foodcart11.000webhostapp.com/';
  private user: Users;
  private isLogin: boolean = false;

  constructor(private http: HttpClient) {}

  setLogin() {
    this.isLogin = true;
  }

  unsetLogin() {
    this.isLogin = false;
  }

  getLogin() {
    return this.isLogin;
  }

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

  getUserById(id: number) {
    return this.http.get(this.url + 'getUserByID.php?id=' + id);
  }

  insertUser(user) {
    return this.http.post(this.url + 'insertUser.php', JSON.stringify(user));
  }

  updateUser(resource) {
    return this.http.post(
      this.url + 'updateUser.php',
      JSON.stringify(resource)
    );
  }

  updatePassword(resource) {
    return this.http.post(
      this.url + 'updatePassword.php',
      JSON.stringify(resource)
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

  getItemByUid(uid: number) {
    return this.http.get(this.url + 'getItemByUid.php?uid=' + uid);
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

  deleteItem(id: number) {
    return this.http.get(this.url + 'deleteItem.php?id=' + id);
  }

  deleteItemByUid(uid: number) {
    return this.http.get(this.url + 'deleteItemByUid.php?uid=' + uid);
  }

  addItemToOrders(resource) {
    return this.http.post(
      this.url + 'insertItemToOrders.php',
      JSON.stringify(resource)
    );
  }

  getOrdersByUid(uid: number) {
    return this.http.get(this.url + 'getOrdersByUid.php?uid=' + uid);
  }
}
