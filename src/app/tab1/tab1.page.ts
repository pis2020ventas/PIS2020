import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { FirestoreService } from '../services/firestore/firestore.service';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../shared/product.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {t
  public products = Array<Product>();
  private isLooged;
  private text;
  constructor(
    private dataApis: FirestoreService, 
    public cartService: CartService,
    private afauth: AngularFireAuth,
    private router: Router) {
      if(this.afauth.currentUser != null) {
        this.text="Login";
        this.isLooged = false;
      } else {
        this.text="Logout ";
        this.isLooged = true;
      }
    }

  ngOnInit() {
   this.getAllProducts();
  }

  getAllProducts():void{
    this.dataApis.getAllProducts().subscribe(products =>{
        this.products=products;
    })
  }

  addProductCart(product):void{  
    this.cartService.addProductCart(product);
  }

  isLogged(){
    //console.log('is ',this.isLooged);
    if(this.isLooged) {
      this.isLooged=!this.isLooged;
      this.text="Logout ";
      this.sendToLogin();
      return true;
    } else {
      this.logout();
      this.isLooged=!this.isLooged;
      this.text="Login";
    return false;
    } 
  }
  sendToLogin(){
     this.router.navigate(['/login']);
  }
  logout(){
    this.afauth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
