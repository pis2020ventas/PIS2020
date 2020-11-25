import { Component } from '@angular/core';
import { Product } from '../shared/product.interface';
import { CartService } from '../services/cart/cart.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public cart = new Map();
  public total: number = 0;
  public hayEmpanadas: boolean = false;
  public max: number = 10;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.getTotal();
   }

  getTotal(){
    this.total = 0;
    for(let [product, cantidad] of this.cart) {
      this.total += product.precio * cantidad; 
    }
  }

  addProductCart(product):void{  
    this.cart.set(product, 1);
    this.getTotal();
  }

  removeProductCart(product):void{  
    this.cart.delete(product);
  }

  moreProductCart(product):void{
    this.cart.set(product, this.cart.get(product) + 1);
    this.getTotal();
    if(this.cart.get(product) == 0) {
      this.cart.delete(product)
    }
  }
  //no se actualiza cuando el producto llega a cero
  lessProductCart(product):void{  
    this.cart.set(product, this.cart.get(product) - 1);
    this.getTotal();
  }

  getKeys(map){
    return Array.from(map.keys());
  }

}
