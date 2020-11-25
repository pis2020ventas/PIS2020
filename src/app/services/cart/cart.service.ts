import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart = new Map();

  constructor() { }

  addProductCart(product):void{  
    this.cart.set(product, 1);
  }

  getCart(){
    return this.cart;
  }
}
