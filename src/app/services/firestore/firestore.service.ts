import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFireList } from '@angular/fire/database';
import { Product } from 'src/app/shared/product.interface';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
studentsRef: AngularFireList<any>; 

  constructor(
    private db: AngularFirestore,
  ){}

  public getAllPosts(): Observable<Product[]> {
    return this.db
      .collection('comida')
      .snapshotChanges()
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
