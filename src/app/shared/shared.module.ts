import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

const modules = [CommonModule, ReactiveFormsModule, FormsModule];
const components = [HeaderComponent];
const materialModules = [
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatSelectModule,
];

@NgModule({
  declarations: [LoadingComponent],
  imports: [...modules, ...components, ...materialModules],
  exports: [...modules, ...components, ...materialModules, LoadingComponent],
})
export class SharedModule {}
