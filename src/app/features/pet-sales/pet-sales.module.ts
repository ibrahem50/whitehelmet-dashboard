import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetSalesRoutingModule } from './pet-sales-routing.module';
import { PetSalesComponent } from './pet-sales.component';


@NgModule({
  declarations: [
    PetSalesComponent
  ],
  imports: [
    CommonModule,
    PetSalesRoutingModule
  ]
})
export class PetSalesModule { }
