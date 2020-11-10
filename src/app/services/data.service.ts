import { Address } from './../models/address';
import { Users } from './../models/users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://foodcart11.000webhostapp.com/';
  private user: Users;
  private isLogin = JSON.parse(localStorage.getItem('login')) || false;
  private address: Address;

  constructor(private http: HttpClient) {}

  setLogin() {
    this.isLogin = true;
    localStorage.setItem('login', 'true');
  }

  unsetLogin() {
    this.isLogin = false;
    localStorage.removeItem('login');
  }

  getLogin() {
    return this.isLogin;
  }

  getUser() {
    return this.user;
  }

  getFirstName() {
    console.log('Called this method!! ', localStorage.getItem('firstName'));
    return localStorage.getItem('firstName');
  }

  getLastName() {
    return localStorage.getItem('lastName');
  }

  getIdLocal() {
    return parseInt(localStorage.getItem('ID'));
  }

  setUser(resource) {
    this.user = resource;
    localStorage.setItem('firstName', resource.firstname);
    localStorage.setItem('lastName', resource.lastname);
    localStorage.setItem('ID', resource.id);
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

  getRestaurantByCity(city: string) {
    return this.http.get(this.url + 'getRestaurantByCity.php?city=' + city);
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

  insertAddress(resource) {
    return this.http.post(
      this.url + 'insertAddress.php',
      JSON.stringify(resource)
    );
  }

  getAddressByUid(uid: number) {
    return this.http.get(this.url + 'getAddressByUid.php?uid=' + uid);
  }

  getAddressByUidAndCurrent(uid: number) {
    return this.http.get(this.url + 'getAddressByUidAndCurrent.php?uid=' + uid);
  }

  deleteAddressById(id: number) {
    return this.http.get(this.url + 'deleteAddress.php?id=' + id);
  }

  updateAddress(resource) {
    return this.http.post(
      this.url + 'updateAddress.php',
      JSON.stringify(resource)
    );
  }

  setAddress(resource) {
    this.address = resource;
  }

  getAddress() {
    return this.address;
  }

  getAddressById(id: number) {
    return this.http.get(this.url + 'getAddressById.php?id=' + id);
  }

  updateCurrentAddress(resource) {
    return this.http.post(
      this.url + 'updateCurrentAddress.php',
      JSON.stringify(resource)
    );
  }
}
