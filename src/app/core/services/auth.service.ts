import { AuthInterface, AuthInterfaceResponse } from '../interfaces/auth';
import { Injectable, inject } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'jwt_token';
  private readonly path = 'login';
  private apiService = inject(ApiService);
  private router = inject(Router);

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  login(data: AuthInterface) {
    return this.apiService
      .postRequest<AuthInterfaceResponse>(this.path, data)
      .pipe(tap((res) => this.setToken(res.accessToken)));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/auth/login']);
  }
}
