import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Product } from 'src/app/shared/product.interface';
import { Sucursal } from 'src/app/shared/sucursal.interface';

import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private sucursalesCollection: AngularFirestoreCollection<Sucursal>;
  private productsSucursalCollection: AngularFirestoreCollection<Product>;
  private bookDoc: AngularFirestoreDocument<Product>;
  private sucDoc : AngularFirestoreDocument<Sucursal>;
  private book: Observable<Product>;

  constructor(private afs: AngularFirestore) {
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
  getOneProduct(id: string){
    this.bookDoc = this.afs.doc<Product>(`comida/${id}`);
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Product;
        data.id = action.payload.id;
        return data;
      }
    }));  }

    getSucursales(){
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

    getOneSucursal(id: string){
      this.sucDoc = this.afs.doc<Sucursal>(`sucursales/${id}`);
      return this.sucDoc.snapshotChanges().pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Sucursal;
          data.id = action.payload.id;
          return data;
        }
      }));  }

    getProductoSucursal(id: string){
      this.productsSucursalCollection =  this.afs.collection<Product>(`inventario/${id}/comida/`);
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
