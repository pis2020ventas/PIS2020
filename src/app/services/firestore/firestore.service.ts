import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from 'src/app/shared/product.interface';
import { Sucursal } from 'src/app/shared/sucursal.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale } from 'src/app/shared/sale.interface';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/shared/user';
import { Cliente } from 'src/app/shared/client.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private productsCollection: AngularFirestoreCollection<Product>;
    private clientsCollection: AngularFirestoreCollection<Cliente>;

  private sucursalesCollection: AngularFirestoreCollection<Sucursal>;
  private productsSucursalCollection: AngularFirestoreCollection<Product>;
  private userCollection: AngularFirestoreCollection<User>;
  private bookDoc: AngularFirestoreDocument<Product>;
  private sucDoc: AngularFirestoreDocument<Sucursal>;
  private book: Observable<Product>;

  constructor(private toastr: ToastController, private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('Comida');
    this.clientsCollection = afs.collection<Product>('Cliente');

    this.sucursalesCollection = afs.collection<Sucursal>('Sucursales');
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
public getAllClientes() {
    return this.clientsCollection.snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getOneProduct(id: string) {
    this.bookDoc = this.afs.doc<Product>(`Comida/${id}`);
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
    this.afs.doc('Pedidos' + '/' + ids).set({
      uid: sale.uid,
      position: {
        lat: sale.position.lat,
        lng: sale.position.lng
      },
      usuario: sale.usuario,
      nombre: sale.nombre,
      direccion: sale.direccion,
      telefono: sale.telefono,
      productos: this.getCart(sale.productos),
      nit: sale.nit,
      estado: "Listo para recoger",
      fechahorapedido: sale.fechahorapedido,
      total: sale.total,
      moto: "",
      sucursal: sale.sucursal,
      pedido:sale.pedido,
      detalle: sale.detalle
    });

    this.toast('\Compra realizada', 'warning');
  }
  public createClientForRanking(client: Cliente){
    let ids = this.afs.createId();
    this.afs.doc('Cliente' + '/' + ids).set({
      nombre: client.nombre,
      nit: client.nit,
      uid: client.uid,
      fecha: client.fecha,
      total:client.total,      
    });
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

  getCart(map){
    let cartArray = [];
    map.forEach((cantidad, product) => {
      console.log(cantidad);
      console.log(product);
      cartArray.push({
        id: product.id,
        cantidad: Number(cantidad)
      });
    });
    return cartArray;
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
    this.sucDoc = this.afs.doc<Sucursal>(`Sucursales/${id}`);
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
    this.productsSucursalCollection = this.afs.collection<Product>(`Inventario/comida/${id}/`);
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
  async getUserName(id: string) { 
      var v;
      this.userCollection = this.afs.collection("users");
      return this.userCollection.doc(id).valueChanges();

    }
}
