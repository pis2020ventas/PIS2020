import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartFormPage } from './cart-form.page';

const routes: Routes = [
  {
    path: '',
    component: CartFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartFormPageRoutingModule {}
