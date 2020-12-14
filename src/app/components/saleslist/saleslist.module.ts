import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleslistPageRoutingModule } from './saleslist-routing.module';

import { SaleslistPage } from './saleslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleslistPageRoutingModule
  ],
  declarations: [SaleslistPage]
})
export class SaleslistPageModule {}
