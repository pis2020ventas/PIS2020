import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingclientesPageRoutingModule } from './rankingclientes-routing.module';

import { RankingclientesPage } from './rankingclientes.page';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingclientesPageRoutingModule,
    PipesModule
  ],
  declarations: [RankingclientesPage]
})
export class RankingclientesPageModule {}
