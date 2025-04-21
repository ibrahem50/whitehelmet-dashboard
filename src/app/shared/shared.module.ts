import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoadingComponent, HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
