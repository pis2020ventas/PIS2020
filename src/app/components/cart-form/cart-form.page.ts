import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.page.html',
  styleUrls: ['./cart-form.page.scss'],
})
export class CartFormPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  ptotal:number
  carritoc = [];
  public cart = new Map();

  constructor(public cartService: CartService, public formBuilder: FormBuilder){ 
      this.ptotal= cartService.getTotal();
      this.cart = this.cartService.getCartMap();

  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      nit: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(8)]],
      direccion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(9)]],

    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
  getKeys(map){
    return Array.from(map.keys());
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      
      this.cartService.saveCompra(this.ionicForm.value,this.getKeys(this.cart),this.ptotal);
      console.log(this.ionicForm.value)
    }
  }
  
  get nombre() { return this.ionicForm.get('nombre'); }
  get direccion() { return this.ionicForm.get('direccion'); }
  get nit() { return this.ionicForm.get('nit'); }
  get telefono() { return this.ionicForm.get('telefono'); }

}
