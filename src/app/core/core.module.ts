import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [],
  imports: [RouterModule],
  providers: [provideHttpClient(withInterceptors([loaderInterceptor]))],
  exports: [RouterModule],
})
export class CoreModule {}
