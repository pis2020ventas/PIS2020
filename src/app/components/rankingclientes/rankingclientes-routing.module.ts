import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingclientesPage } from './rankingclientes.page';

const routes: Routes = [
  {
    path: '',
    component: RankingclientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingclientesPageRoutingModule {}
