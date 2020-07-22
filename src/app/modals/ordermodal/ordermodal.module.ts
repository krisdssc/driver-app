import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdermodalPageRoutingModule } from './ordermodal-routing.module';

import { OrdermodalPage } from './ordermodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdermodalPageRoutingModule
  ],
  declarations: [OrdermodalPage]
})
export class OrdermodalPageModule {}
