import { Component, OnInit, inject } from '@angular/core';

import { AuthService } from './core/services/auth.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private loadingService = inject(LoadingService);
  private us = inject(AuthService);
  loading$ = this.loadingService.loading$;
  title = 'attractions';

  ngOnInit(): void {}
}
