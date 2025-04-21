import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { UserInterface, UserResponse } from '../interface/user';

import { ApiService } from '../../../core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly path = 'users';
  private apiService = inject(ApiService);

  getUsers(
    search: string = '',
    page: number = 1,
    per_page: number = 10,
    sort_column: string = 'id',
    sort_order: 'asc' | 'desc' = 'desc'
  ): Observable<UserResponse> {
    const queryParams = [
      `page=${page}`,
      `per_page=${per_page}`,
      sort_column ? `sort_column=${sort_column}` : '',
      sort_order ? `sort_order=${sort_order}` : '',
      search ? `search=${encodeURIComponent(search)}` : '',
    ]
      .filter(Boolean)
      .join('&');

    return this.apiService
      .getRequest<UserResponse>(`${this.path}?${queryParams}`)
      .pipe(shareReplay());
  }

  addUser(user: UserInterface) {
    return this.apiService
      .postRequest<UserInterface[]>(`${this.path}/create`, user)
      .pipe(shareReplay());
  }

  updateUser(user: UserInterface) {
    return this.apiService
      .putRequest<{ status: string; user: UserInterface; message: string }>(
        `${this.path}/update`,
        user
      )
      .pipe(shareReplay());
  }

  getUser(userId: number) {
    return this.apiService
      .getRequest<{ status: string; user: UserInterface }>(
        `${this.path}/${userId}`
      )
      .pipe(
        map((res) => res.user),
        shareReplay()
      );
  }

  deleteUser(id: number) {
    return this.apiService
      .deleteRequest<{ status: string; message: string }>(
        `${this.path}/delete`,
        { id }
      )
      .pipe(shareReplay());
  }
}
