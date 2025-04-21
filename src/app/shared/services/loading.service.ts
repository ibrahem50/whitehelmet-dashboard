import { BehaviorSubject } from 'rxjs';
// src/app/shared/loading.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  startLoading(): void {
    this.loadingSubject.next(true);
  }

  stopLoading(): void {
    this.loadingSubject.next(false);
  }
}
