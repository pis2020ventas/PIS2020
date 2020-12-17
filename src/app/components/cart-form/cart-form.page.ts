import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { FirestoreService } from "../../services/firestore/firestore.service";
import { CartService } from 'src/app/services/cart/cart.service';
import { Sale } from 'src/app/shared/sale.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/product.interface';

declare var google;
let uid: any;
import { AlertController } from "@ionic/angular";
import { Cliente } from "src/app/shared/client.interface";

@Component({
  selector: "app-cart-form",
  templateUrl: "./cart-form.page.html",
  styleUrls: ["./cart-form.page.scss"],
})
export class CartFormPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  ptotal: number;
  map: any;
  position = [];
  name: string;
  nits: string;
  user: string;
  direction: string;
  telephone: number;
  cart = new Map();
  lat: string;
  long: string;
  location: any;
  private isLooging;
  private text;
  private currentuser;
  private currentsuperuser;
  markers = [];
  sucursalCartText: string;

  constructor(
    private geolocation: Geolocation,
    public cartService: CartService,
    private firestoreService: FirestoreService,
    private afauth: AngularFireAuth,
    private router: Router,
    public alertController: AlertController,
    public formBuilder: FormBuilder
  ) {
    this.ptotal = cartService.getTotal();
    this.cart = this.cartService.getCartMap();
  }

  ngOnInit() {
   this.validations();
    this.loadMap();
    this.checkIfUserExists();
  }
  validations(){
     (this.ionicForm = this.formBuilder.group({
      nombre: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      usuario: [],
      nit: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
          Validators.maxLength(8),
        ],
      ],
      direccion: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      telefono: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
          Validators.maxLength(9),
        ],
      ],
    }))
  
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
        marker.addListener("dragend", () => {
          this.markers.push(marker);
          var res = this.markers[this.markers.length - 1].position
            .toString()
            .split("(");
          var res2 = res[1].split(",");
          var res3 = res2[1].split(")");
          this.lat = res2[0];
          this.long = res3[0];
        });
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }
  checkIfUserExists() {
    this.afauth.currentUser.then(async (data) => {
     if(data.displayName==null){
          (await this.firestoreService.getUserName(data.uid)).subscribe(a =>{
            this.currentuser = a.displayName;
            
          });
          this.isLooging=false;
        } else {
          
          this.currentuser = data.displayName;
          this.isLooging=false;
        }
        this.currentsuperuser = data.uid;
        console.log("-----" + this.currentsuperuser);
    });
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  getKeys(map) {
       return Array.from(map.keys());
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      this.alertController
        .create({
          header: "Confirmar",
          subHeader: 'Confirmar',
          message: "¿Está seguro que desea confirmar el pedido?",
          buttons: [
            {
              text: "NO",
              handler: () => {
                this.router.navigate(["/"]);
              },
            },
            {
              text: "SI",
              handler: () => {
                let uid = this.currentsuperuser;
                let name = this.name;
                let user = this.user;
                let address = this.direction;
                let telf = this.telephone;
                let nit = this.nits;
                this.createSale({
                  position: {
                    lat: Number(this.lat),
                    lng: Number(this.long),
                  },
                  uid: uid,
                  usuario: user,
                  nombre: name,
                  direccion: address,
                  telefono: telf,
                  nit: nit,
                  productos : this.cart,
                  sucursal: this.cartService.sucursal,
                  total: this.ptotal,
                  pedido: "Pedido - " + Math.floor(Math.random() * 999999),
                  fechahorapedido: new Date().toString(),
                });
                this.createClientForRanking({
                  nombre: name,
                  fecha: new Date().toString(),
                  total:this.ptotal,   
                  uid: uid,
                  nit:nit,
                });

                this.router.navigate(["/"]);
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    }
  }

  goToHome() {
    this.router.navigate(["/"]);
  }
  createSale(sale: Sale) {
    this.firestoreService.insertData(sale);
  }
  createClientForRanking(cliente: Cliente) {
    this.firestoreService.createClientForRanking(cliente);
  }
  get nombre() {
    return this.ionicForm.get("nombre");
  }
  get usuario() {
    return this.ionicForm.get("usuario");
  }
  get direccion() {
    return this.ionicForm.get("direccion");
  }
  get nit() {
    return this.ionicForm.get("nit");
  }
  get telefono() {
    return this.ionicForm.get("telefono");
  }
 
}
