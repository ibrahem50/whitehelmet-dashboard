import { DailyPetSalesResponse, PetsData } from '../interfaces/pet-sales';
import { Injectable, inject } from '@angular/core';

import { ApiService } from '../../../core/api/api.service';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetSalesService {
  private readonly path = 'pets';
  private apiService = inject(ApiService);

  getWeeklySales(endDate: string) {
    return this.apiService
      .getRequest<PetsData>(`${this.path}/7Days/${endDate}`)
      .pipe(shareReplay());
  }

  getDailySales(date: string) {
    return this.apiService
      .getRequest<DailyPetSalesResponse[]>(`${this.path}/${date}`)
      .pipe(shareReplay());
  }
}
