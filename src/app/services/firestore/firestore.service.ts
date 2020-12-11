import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from 'src/app/shared/product.interface';
import { Sucursal } from 'src/app/shared/sucursal.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale } from 'src/app/shared/sale.interface';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private sucursalesCollection: AngularFirestoreCollection<Sucursal>;
  private productsSucursalCollection: AngularFirestoreCollection<Product>;
  private bookDoc: AngularFirestoreDocument<Product>;
  private sucDoc: AngularFirestoreDocument<Sucursal>;
  private book: Observable<Product>;

  constructor(private toastr: ToastController, private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('comida');
    this.sucursalesCollection = afs.collection<Sucursal>('sucursales');
  }

  public getAllProducts() {
    return this.productsCollection.snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getOneProduct(id: string) {
    this.bookDoc = this.afs.doc<Product>(`comida/${id}`);
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Product;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  public insertData(sale: Sale) {
    let ids = this.afs.createId();
    this.afs.doc('venta' + '/' + ids).set({
      position: {
        lat: sale.position.lat,
        lng: sale.position.lng
      },
      usuario: sale.usuario,
      nombre: sale.nombre,
      direccion: sale.direccion,
      telefono: sale.telefono,
      productos: sale.productos,
      nit: sale.nit,
      estado: "Listo para recoger",
      fechahorapedido: new Date(),
      total: sale.total,
      moto: ""
    });

    this.toast('\Compra realizada', 'primary');
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      duration: 2000,

      animated: true
    });
    toast.present();
  }

  getSucursales() {
    return this.sucursalesCollection.snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Sucursal;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getOneSucursal(id: string) {
    this.sucDoc = this.afs.doc<Sucursal>(`sucursales/${id}`);
    return this.sucDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Sucursal;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  getProductoSucursal(id: string) {
    this.productsSucursalCollection = this.afs.collection<Product>(`inventario/${id}/comida/`);
    return this.productsSucursalCollection.snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

}
