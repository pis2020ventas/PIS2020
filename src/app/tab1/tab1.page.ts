import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';

import { FirestoreService } from '../services/firestore/firestore.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private dataApis: FirestoreService) {}
 
    tutorials: any;
  public products =[];

  ngOnInit() {
   this.getAllProducts();
  }
  getAllProducts():void{
     this.dataApis.getAllProducts().subscribe(products =>{
        this.products=products;
    })
  }
}
