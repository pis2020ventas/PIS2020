import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { FirestoreService } from '../services/firestore/firestore.service';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../shared/product.interface';
import { Sucursal } from '../shared/sucursal.interface';
import { element } from 'protractor';
import { identifierName } from '@angular/compiler';
import { Console } from 'console';
import { LoadingController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { delay, first } from 'rxjs/operators';
import { User } from '../shared/user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {
  public products = Array<Product>();
  public sucursales = Array<Sucursal>();
  public productsSuc = Array<Product>();
  private loading: HTMLIonLoadingElement;
  private isLooging;
  private currentuser;
  private text;
  selectSucursal: any;
  constructor(private dataApis: FirestoreService, public cartService: CartService,
    private afauth: AngularFireAuth,
    private router: Router) { }
  
  ngOnInit() {
    this.getSucursales();
    this.getAllProducts();
    this.checkIfUserExists();
    //this.getAllProducts();
  }

  getAllProducts(): void {
    this.dataApis.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  addProductCart(product): void {
    this.cartService.addProductCart(product);
  }

  getSucursales() {
    this.dataApis.getSucursales().subscribe(sucursales => {
      this.sucursales = sucursales;
      this.selectSucursal = this.sucursales[0].id;
    })
  }

  getProductSucursal(id: string): void {
    this.dataApis.getProductoSucursal(id).subscribe(productsSuc => {
      this.productsSuc = productsSuc;
    })
    this.cleanCart();
    this.cartService.setSucursal(id);
  }

  cleanCart(): void {
    this.cartService.cart.clear();
  } 
  
  checkIfUserExists(){
    this.afauth.currentUser.then((data)=>{
      this.isLooging =false;
      if(data==null) {
        this.text="INICIAR SESIÓN";
        this.currentuser=" ";
      } else {
        this.currentuser=data.displayName;
        this.text="SALIR";
      }
    });
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
       this.text = "INICIAR SESIÓN";
       this.currentuser = "";
       this.isLooging=false;
     }
   });
 }

  loggingMethod() {
    this.afauth.currentUser.then(async data=> {
      if(data!=null) {
        console.log(data.uid);
        if(data.displayName==null){
          (await this.dataApis.getUserName(data.uid)).subscribe(a =>{
            this.currentuser = a.displayName;
          });
          console.log(this.currentuser);
          this.isLooging=false;
        } else {
          this.currentuser = data.displayName;
          this.isLooging=false;
        }
        this.text = "SALIR";
      }
      else{
        this.currentuser = "";
        this.text = "INICIAR SESIÓN";
      }
      this.isLooging=false;
    });
  }
}
