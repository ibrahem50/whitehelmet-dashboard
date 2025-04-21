import { AuthInterface, AuthInterfaceResponse } from '../interfaces/auth';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable, inject } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'jwt_token';
  private readonly path = 'login';
  private apiService = inject(ApiService);
  private router = inject(Router);

  private authState = new BehaviorSubject<boolean>(this.hasToken());
  readonly isAuthenticated$: Observable<boolean> =
    this.authState.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authState.next(true);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState.next(false);
  }

  login(data: AuthInterface) {
    return this.apiService
      .postRequest<AuthInterfaceResponse>(this.path, data)
      .pipe(tap((res) => this.setToken(res.accessToken)));
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticatedSync(): boolean {
    return this.authState.getValue();
  }
}
