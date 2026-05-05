import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { finalize, map } from 'rxjs';
import { CitiesService } from '@api/api/cities.service';
import { City } from '@api/model/models';
import {
  DataViewColumn,
  OttoDataViewComponent,
} from '@shared/components/otto-data-view.component/otto-data-view.component';
import { Pagination } from '@shared/models/pagination.model';
import { OttoSpinnerComponent } from '@shared/components/otto-spinner.component/otto-spinner.component';

const DEFAULT_PAGE_SIZE = 4;

@Component({
  selector: 'app-home',
  imports: [OttoSpinnerComponent, OttoDataViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly citiesService = inject(CitiesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(true);
  readonly cities = signal<City[]>([]);
  readonly pagination = signal<Pagination>({
    pageNumber: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });

  readonly columns: DataViewColumn<City>[] = [
    { field: 'name', header: 'Name', width: '15%' },
    { field: 'name_native', header: 'Native name', width: '15%' },
    { field: 'country', header: 'Country', width: '15%' },
    { field: 'continent', header: 'Continent', width: '15%' },
    { field: 'population', header: 'Population', width: '15%' },
    { field: 'founded', header: 'Founded', width: '10%' },
    { field: 'latitude', header: 'Latitude', width: '10%' },
    { field: 'longitude', header: 'Longitude', width: '10%' },
    { field: 'landmarks', header: 'Landmarks', width: '10%' },
  ];

  constructor() {
    this.fetchPage(1, DEFAULT_PAGE_SIZE);
  }

  onPaginationChange(next: Pagination): void {
    const page = Math.floor(next.pageNumber / next.pageSize) + 1;
    this.fetchPage(page, next.pageSize);
  }

  private fetchPage(page: number, limit: number): void {
    this.loading.set(true);
    this.citiesService
      .getAllCities(page, limit)
      .pipe(
        map((res) => res.data),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (data) => {
          if (!data) {
            this.cities.set([]);
            return;
          }
          this.cities.set(data.items);
          this.pagination.set({
            pageNumber: (data.pagination.page - 1) * data.pagination.limit,
            pageSize: data.pagination.limit,
            total: data.pagination.totalItems,
          });
        },
      });
  }
}
