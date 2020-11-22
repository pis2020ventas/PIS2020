import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Product } from 'src/app/shared/product.interface';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dbPath = '/comida';
  tutorialsRef: AngularFireList<Product> = null;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }
  
  getAll(): AngularFireList<Product> {
    return this.tutorialsRef;
  }


  
}
