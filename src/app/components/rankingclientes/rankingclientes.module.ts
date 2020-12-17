import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingclientesPageRoutingModule } from './rankingclientes-routing.module';

import { RankingclientesPage } from './rankingclientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingclientesPageRoutingModule
  ],
  declarations: [RankingclientesPage]
})
export class RankingclientesPageModule {}
