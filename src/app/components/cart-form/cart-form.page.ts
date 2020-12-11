import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { FirestoreService } from "../../services/firestore/firestore.service";

import { CartService } from 'src/app/services/cart/cart.service';
import { Sale } from 'src/app/shared/sale.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
declare var google;
let uid: any;

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.page.html',
  styleUrls: ['./cart-form.page.scss'],
})
export class CartFormPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  ptotal:number
  map: any;
  position=[];
  name: string;
  nits: string;
  user:string;
  direction: string;
  telephone : number;
  cart = new Map();
  lat: string;
  long: string;
  location: any;
  private isLooging;
  private text;
  private currentuser;

  constructor(
    private geolocation: Geolocation,
    public cartService: CartService,
    private firestoreService: FirestoreService,
    private afauth: AngularFireAuth,
     private router: Router,
    public formBuilder: FormBuilder){ 
    this.ptotal= cartService.getTotal();
    this.cart = this.cartService.getCartMap();
     }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      usuario: [],
      nit: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(8)]],
      direccion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(9)]],

    }),
    this.loadMap();
    this.checkIfUserExists();

  }

  loadMap() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
     
        this.lat = resp.coords.latitude.toString();
        this.long = resp.coords.longitude.toString();

      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
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
  get errorControl() {
    return this.ionicForm.controls;
  }
  getKeys(map){
    return Array.from(map.keys());
  }
 
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
        let name = this.name;
        let user = this.user;
        let address = this.direction;
        let telf = this.telephone;
        let nit = this.nits

        this.createSale(
          {
            position: {
              lat: Number(this.lat),
              lng: Number(this.long),
            },
              usuario: user,
              nombre : name,
              direccion : address,
              telefono : telf,
              nit: nit,
              productos : this.getKeys(this.cart),
              total : this.ptotal
        });

        this.router.navigate(['/']);

    }
  }

  createSale(sale : Sale){
    this.firestoreService.insertData(sale);
  }
  get nombre() { return this.ionicForm.get('nombre'); }
  get usuario() { return this.ionicForm.get('usuario'); }
  get direccion() { return this.ionicForm.get('direccion'); }
  get nit() { return this.ionicForm.get('nit'); }
  get telefono() { return this.ionicForm.get('telefono'); }
}

