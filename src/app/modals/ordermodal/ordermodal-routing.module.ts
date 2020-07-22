import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdermodalPage } from './ordermodal.page';

const routes: Routes = [
  {
    path: '',
    component: OrdermodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdermodalPageRoutingModule {}
