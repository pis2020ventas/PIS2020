import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { FirestoreService } from '../services/firestore/firestore.service';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../shared/product.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {t
  public products = Array<Product>();

  constructor(private dataApis: FirestoreService, public cartService: CartService) {}

  ngOnInit() {
   this.getAllProducts();
   
   //this.products = this.dataApis.getAllProducts();
  }

  getAllProducts():void{
    this.dataApis.getAllProducts().subscribe(products =>{
        this.products=products;
    })
  }

  addProductCart(product):void{  
    this.cartService.addProductCart(product);
  }

}
