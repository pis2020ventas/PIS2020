import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  public cart: Cart;
  constructor() { }

  ngOnInit() {}

}
