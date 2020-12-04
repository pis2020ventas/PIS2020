import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart = new Map();
  public sucursal: string;
  keys = [];
  angularFirestore: any;

  constructor(private toastr: ToastController, private afs: AngularFirestore) {
  }

  addProductCart(product): void {
    if (this.cart.has(product)) {
      this.cart.set(product, (this.cart.get(product) + 1));
    } else {
      this.cart.set(product, 1);
    }
    this.toast('\"' + product.nombre + ' x ' + (this.cart.get(product)) + '\" añadido al Carrito', 'primary');
  }

  removeProductCart(product): void {
    this.cart.delete(product);
  }

  moreProductCart(product): void {
    this.cart.set(product, this.cart.get(product) + 1);
  }

  lessProductCart(product): void {
    this.cart.set(product, this.cart.get(product) - 1);
  }
  getCartMap() {
    return this.cart;
  }

  getTotal() {
    var total: number = 0;
    for (let [product, cantidad] of this.cart) {
      total += product.precio * cantidad;
    }
    return total;
  }

  setSucursal(sucursal: string): void {
    this.sucursal = sucursal;
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000,
      animated: true
    });
    toast.present();
  }

}
