import { IonicModule } from '@ionic/angular';
import { NgModule,  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Product } from '../shared/product.interface';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PostService } from './../components/posts/post.service';

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

  constructor(private postSvc: PostService) { }

  ngOnInit() {
    console.log("caca");
    //this.postSvc.getAllPosts().subscribe(res => console.log("POST", res));
   // this.posts$ = this.postSvc.getAllPosts();
   this.postSvc.getCat().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        this.cats.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      })
    });
  }
}
