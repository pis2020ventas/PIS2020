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


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {
  t
  public products = Array<Product>();
  public sucursales = Array<Sucursal>();
  public productsSuc = Array<Product>();
  private loading: HTMLIonLoadingElement;
  selectSucursal: String;
  constructor(private dataApis: FirestoreService, public cartService: CartService) { }

  ngOnInit() {
    this.getSucursales();
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
}
