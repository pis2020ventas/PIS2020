import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FirestoreService } from '../services/firestore/firestore.service';
import { Product } from '../shared/product.interface';
//import { CartComponent } from "../components/cart/cart.component";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
/*@NgModule({
  declarations: [
    CartComponent
  ]
})*/
export class Tab1Page implements OnInit {t
  public products =Array<Product>();
  public cart =Array<Product>();
  //public cart: CartComponent;
  public a: boolean = false;
  public b: boolean = true;

  constructor(private dataApis: FirestoreService) {}
 

  ngOnInit() {
   this.getAllProducts();
   //this.products = this.dataApis.getAllProducts();
  }
  
  getAllProducts():void{
    this.dataApis.getAllProducts().subscribe(products =>{
        this.products=products;
    })
  }

  addProductCart(product: Product):void{
    this.cart.push(product);
  }

  checkCart():void{
    this.a=true;
  }
}
