import { IonicModule } from '@ionic/angular';
import { NgModule,  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Product } from '../shared/product.interface';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FirestoreService } from '../services/firestore/firestore.service';
import { map } from 'rxjs/operators';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule implements OnInit {

  //public posts$: Observable<Product[]>;
  public cats = [];

  constructor(private ps: FirestoreService) { }

  ngOnInit():void {
    //this.postSvc.getAllPosts().subscribe(res => console.log("POST", res));
   // this.posts$ = this.postSvc.getAllPosts();
  }
    tutorials: any;


}
