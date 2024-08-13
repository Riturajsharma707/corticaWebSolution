import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiURL = 'http://localhost:5000/api/';
  quentity: number = 0;
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.apiURL + 'item');
  }

  addItem(item: any) {
    return this.http.post(this.apiURL + 'cart-items', item);
  }

  getCart() {
    return this.http.get(this.apiURL + 'cart');
  }

  removeCartItem(id: any) {
    return this.http.delete(this.apiURL + `remove/${id}`);
  }
}
