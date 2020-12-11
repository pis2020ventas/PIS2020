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
  markers = [];

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
        let latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        this.lat = resp.coords.latitude.toString();
        this.long = resp.coords.longitude.toString();

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        this.map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );

        var marker = new google.maps.Marker({
          draggable: true,
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: latLng,
        });

        this.markers.push(marker);
        //alert(this.markers[0].position)

        marker.addListener("dragend", () => {
          this.markers.push(marker);
          //alert(this.markers[this.markers.length-1].position);
          var res = this.markers[this.markers.length - 1].position
            .toString()
            .split("(");
          var res2 = res[1].split(",");
          //console.log(" lat::"+res2[0]);
          var res3 = res2[1].split(")");
          //console.log("long::"+res3[0]);
          this.lat = res2[0];
          this.long = res3[0];
        });
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });

    // alert('latitud' +this.lat+', longitud'+this.long )
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

