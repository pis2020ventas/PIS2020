import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/product.interface';
import { FirestoreService } from '../../../services/firestore/firestore.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {


  public data: Product ;
 constructor(private route: ActivatedRoute, private postproduct: FirestoreService) { }

 ngOnInit() {
    const idPost = this.route.snapshot.params['id'];
    this.getDetails(idPost);
 }

 getDetails(ids: string): void {
    this.postproduct.getOneProduct(ids).subscribe(products => {
      this.data = products;
    });
  }

}
