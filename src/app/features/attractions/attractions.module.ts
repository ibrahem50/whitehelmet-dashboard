import { AttractionDetailComponent } from './components/attraction-detail/attraction-detail.component';
import { AttractionListComponent } from './components/attraction-list/attraction-list.component';
import { AttractionsRoutingModule } from './attractions-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AttractionDetailComponent, AttractionListComponent],
  imports: [CommonModule, SharedModule, AttractionsRoutingModule],
})
export class AttractionsModule {}
