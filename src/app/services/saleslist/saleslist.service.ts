import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Sale } from 'src/app/shared/sale.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleslistService {
  private salesCollection: AngularFirestoreCollection<Sale>;

  constructor(private afs: AngularFirestore) {
    this.salesCollection = afs.collection<Sale>('Pedidos');
  }

  public getAllSales() {
    return this.salesCollection.snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Sale;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
