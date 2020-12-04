import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public cart = new Map();

  constructor(public cartService: CartService, public router: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getCartMap();
  }

  removeProductCart(product): void {
    this.cartService.removeProductCart(product);
  }

  moreProductCart(product): void {
    this.cartService.moreProductCart(product);
  }

  lessProductCart(product): void {
    this.cartService.lessProductCart(product);
  }

  getKeys(map) {
    return Array.from(map.keys());
  }


  goToProducts() {
    this.router.navigate(['/cart-form']);
  }

}
