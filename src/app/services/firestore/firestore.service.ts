import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Product } from 'src/app/shared/product.interface';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale } from 'src/app/shared/sale.interface';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private bookDoc: AngularFirestoreDocument<Product>;
  private book: Observable<Product>;

  constructor(private afs: AngularFirestore) {
        this.productsCollection = afs.collection<Product>('comida');
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
  public getOneProduct(id: string){
    this.bookDoc = this.afs.doc<Product>(`comida/${id}`);
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Product;
        data.id = action.payload.id;
        return data;
      }
    }));}
  public insertData(id, sale : Sale){
    this.afs.doc('venta'+'/'+id).set({
        position: {
          lat: sale.position.lat,
          lng: sale.position.lng
        },
        nombre: sale.nombre,
        direccion: sale.direccion,
        telefono: sale.telefono,
        productos : sale.productos,
        nit : sale.nit,
        estado : "Listo para recoger",
        fechahorapedido : new Date(),
        total: sale.total
    });
  }


  
}
