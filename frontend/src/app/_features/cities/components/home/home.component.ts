import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { finalize } from 'rxjs';
import { CitiesService } from '@api/api/cities.service';
import { City } from '@api/model/models';
import { DataViewColumn, OttoDataViewComponent } from '@shared/components/otto-data-view.component/otto-data-view.component';
import { Pagination } from '@shared/models/pagination.model';
import { OttoSpinnerComponent } from '@shared/components/otto-spinner.component/otto-spinner.component';

@Component({
  selector: 'app-home',
  imports: [OttoSpinnerComponent, OttoDataViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly citiesService = inject(CitiesService);

  readonly loading = signal(true);
  readonly cities = signal<City[]>([]);
  readonly pagination = signal<Pagination>({ pageNumber: 0, pageSize: 4, total: 0 });

  readonly pagedCities = computed<City[]>(() => {
    const { pageNumber, pageSize } = this.pagination();
    return this.cities().slice(pageNumber, pageNumber + pageSize);
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
    this.citiesService
      .getAllCities()
      .pipe(
        takeUntilDestroyed(),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (cities) => {
          this.cities.set(cities);
          this.pagination.update((p) => ({ ...p, total: cities.length }));
          this.loading.set(false);
        },
      });
  }

  onPaginationChange(next: Pagination): void {
    this.pagination.set({ ...next, total: this.cities().length });
  }
}
