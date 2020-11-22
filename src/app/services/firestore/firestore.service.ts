import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Product } from 'src/app/shared/product.interface';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) {
    this.productsCollection =afs.collection<Product>('comida');
    this.products=this.productsCollection.valueChanges(); 
  }
  private productsCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;
  
  getAllProducts() {
    return this.products= this.productsCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Product;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }


  
}
