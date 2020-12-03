import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { FirestoreService } from '../services/firestore/firestore.service';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../shared/product.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { Console } from 'console';
import { LoadingController } from '@ionic/angular';
import { User } from '../shared/user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {t
  public products = Array<Product>();
  private isLooging;
  private currentuser;
  private text;

  constructor(
    private dataApis: FirestoreService, 
    public cartService: CartService,
    private afauth: AngularFireAuth,
    private router: Router) {}

  ngOnInit() {
   this.getAllProducts();
   this.checkIfUserExists();
  }

  checkIfUserExists(){
    this.afauth.currentUser.then((data)=>{
      this.isLooging =false;
      if(data==null) {
        this.text="Login";
        this.currentuser=" ";
      } else {
        this.currentuser=data.displayName;
        this.text="Logout ";
      }
    });
  }

  getAllProducts():void{
    this.dataApis.getAllProducts().subscribe(products =>{
        this.products=products;
    })
  }

  addProductCart(product):void{  
    this.cartService.addProductCart(product);
  }

  
  sendToLogin(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.afauth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  isLogged(){
    this.afauth.currentUser.then((data)=>{
     if(data == null) { //no user then go to Login
       this.sendToLogin();
       this.isLooging=true;
     } else { //If logged, logout
       this.logout();
       this.text = "Login";
       this.currentuser = "";
       this.isLooging=false;
     }
   });
 }

  loggingMethod() {
    this.afauth.currentUser.then((data)=> {
      if(data!=null) {
        this.currentuser = data.displayName;
        this.text = "Log Out";
      }
      this.isLooging=false;
    });
  }
}
