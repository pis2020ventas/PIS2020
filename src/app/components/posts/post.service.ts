import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../shared/product.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(
    private afs: AngularFirestore,
  ){}
  public getAllPosts(): Observable<Product[]> {
    return this.afs
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
  //Obtiene un gato
  public getCat() {
    return this.afs.collection('comida').snapshotChanges();
  }

  
}