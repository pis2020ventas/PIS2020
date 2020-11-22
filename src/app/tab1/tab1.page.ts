import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FirestoreService } from '../services/firestore/firestore.service';
import { Product } from '../shared/product.interface';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public products =[];

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
}
