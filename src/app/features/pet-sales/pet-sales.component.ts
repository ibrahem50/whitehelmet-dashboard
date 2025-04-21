import { Component, OnInit, inject } from '@angular/core';

import { DailyPetSalesResponse } from './interfaces/pet-sales';
import { PetSalesService } from './services/pet-sales.service';

@Component({
  selector: 'app-pet-sales',
  templateUrl: './pet-sales.component.html',
  styleUrl: './pet-sales.component.scss',
})
export class PetSalesComponent implements OnInit {
  private petSalesService = inject(PetSalesService);
  weeklySeries: any[] = [];
  chartOptions: any;
  categories: string[] = [];
  dailySales: DailyPetSalesResponse[] = [];
  selectedDate: string = '';
  displayedColumns: string[] = ['date', 'animal', 'price'];

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.loadWeeklySales(today);
  }

  loadWeeklySales(date: string) {
    this.petSalesService.getWeeklySales(date).subscribe((res) => {
      this.weeklySeries = res.series;
      this.categories = res.categories;

      this.chartOptions = {
        chart: {
          type: 'line',
          height: 350,
        },
        xaxis: {
          categories: this.categories,
        },
        title: {
          text: 'Weekly Pet Sales',
        },
      };
    });
  }

  onCategorySelected(category: string) {
    this.selectedDate = category;
    this.loadDailySales(category);
  }

  loadDailySales(date: string) {
    this.petSalesService.getDailySales(date).subscribe((res) => {
      this.dailySales = res.map((item) => ({
        ...item,
        price: +item.price,
      }));
      console.log(this.dailySales);
    });
  }

  getTotalPrice(): number {
    return this.dailySales.reduce((acc, item) => acc + item.price, 0);
  }
}
