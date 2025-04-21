import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';
import { AttractionDetailComponent } from './components/attraction-detail/attraction-detail.component';
import { AttractionListComponent } from './components/attraction-list/attraction-list.component';


@NgModule({
  declarations: [
    AttractionsComponent,
    AttractionDetailComponent,
    AttractionListComponent
  ],
  imports: [
    CommonModule,
    AttractionsRoutingModule
  ]
})
export class AttractionsModule { }
