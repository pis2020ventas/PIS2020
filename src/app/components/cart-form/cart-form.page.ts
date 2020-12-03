import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { FirestoreService } from "../../services/firestore/firestore.service";

import { CartService } from 'src/app/services/cart/cart.service';
import { Sale } from 'src/app/shared/sale.interface';
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
  name: string
  nits: string
  direction: string
  telephone : number
  cart = new Map();
  lat: string;
  long: string;
  location: any;

  constructor(
    private geolocation: Geolocation,
    public cartService: CartService,
    private firestoreService: FirestoreService,

    public formBuilder: FormBuilder){ 
    this.ptotal= cartService.getTotal();
    this.cart = this.cartService.getCartMap();
     }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      nit: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(8)]],
      direccion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(9)]],

    }),
    this.loadMap();
  }

  loadMap() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        let latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        this.lat = resp.coords.latitude.toString();
        console.log("latitud: "+this.lat);
        this.long = resp.coords.longitude.toString();
                console.log("longitud: "+this.long);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        this.map = new google.maps.Map(
          document.getElementById("map1"),
          mapOptions
        );
        this.map.addListener("tilesloaded", () => {
          this.lat = this.map.center.lat();
          this.long = this.map.center.lng();

         // this.loadMarkers();
        });
      })
      .catch((error) => {
        console.log("Error getting location", error);
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
        let address = this.direction;
        let telf = this.telephone;
        let nit = this.nits,
        uid = name;

        this.createSale(
          {
            position: {
              lat: Number(this.lat),
              lng: Number(this.long),
            },
              nombre : name,
              direccion : address,
              telefono : telf,
              nit: nit,
              productos : this.getKeys(this.cart),
              total : this.ptotal
        },uid);
    }
  }
  createSale(sale : Sale, uid:any){
    this.firestoreService.insertData(uid, sale);
  }
  get nombre() { return this.ionicForm.get('nombre'); }
  get direccion() { return this.ionicForm.get('direccion'); }
  get nit() { return this.ionicForm.get('nit'); }
  get telefono() { return this.ionicForm.get('telefono'); }
}

