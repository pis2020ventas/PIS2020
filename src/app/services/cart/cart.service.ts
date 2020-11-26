import { Injectable } from '@angular/core';
import { Console } from 'console';
import { map } from 'rxjs/operators';
import { element } from 'protractor';
import { MapOperator } from 'rxjs/internal/operators/map';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart = new Map();

  constructor() { }

  addProductCart(product):void{  
    if(this.cart.has(product)){
      this.cart.set(product,(this.cart.get(product) +1));
    }else{
      this.cart.set(product, 1);
    }
  }

  getCart(){
    return this.cart;
  }
}
