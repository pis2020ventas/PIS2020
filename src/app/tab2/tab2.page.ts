import { Component, NgModule } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  public cart = new Map();
  sucursalCartText: String;

  constructor(private dataApis: FirestoreService, public cartService: CartService, public router: Router) { }

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
    this.setSpecificSucursalText(this.cartService.sucursal);
    return Array.from(map.keys());
  }

  setSpecificSucursalText(id:string):void{
    if(id != null){
      this.dataApis.getOneSucursal(id).subscribe(sucursal => {
        this.sucursalCartText = sucursal.name + " - " + sucursal.address;
      })
    }
  }

  goToProducts() {
    this.router.navigate(['/cart-form']);
  }

}
