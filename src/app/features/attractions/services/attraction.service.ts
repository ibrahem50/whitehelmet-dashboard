import {
  AttractionInterface,
  AttractionResponseInterface,
} from '../interfaces/attraction';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { ApiService } from '../../../core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {
  private readonly path = 'attractions';
  private apiService = inject(ApiService);

  getAttractions(
    search: string = '',
    page: number = 1,
    per_page: number = 10,
    sort_column: string = 'id',
    sort_order: 'asc' | 'desc' = 'desc'
  ) {
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
      .getRequest<AttractionResponseInterface>(`${this.path}?${queryParams}`)
      .pipe(shareReplay());
  }

  addAttraction(attraction: AttractionInterface) {
    return this.apiService
      .postRequest<AttractionInterface[]>(
        `auth/attractions/create`,
        attraction,
        true
      )
      .pipe(shareReplay());
  }

  updateAttraction(attraction: AttractionInterface) {
    return this.apiService
      .putRequest<{
        status: string;
        attraction: AttractionInterface;
        message: string;
      }>(`auth/attractions/update`, attraction, true)
      .pipe(shareReplay());
  }

  getAttraction(attractionId: number) {
    return this.apiService
      .getRequest<{ status: string; attraction: AttractionInterface }>(
        `${this.path}/${attractionId}`
      )
      .pipe(
        map((res) => res.attraction),
        shareReplay()
      );
  }

  deleteAttraction(id: number) {
    return this.apiService
      .deleteRequest<{ status: string; message: string }>(
        `${this.path}/delete`,
        { id }
      )
      .pipe(shareReplay());
  }
}
