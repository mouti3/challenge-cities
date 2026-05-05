import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { CitiesService } from '@api/api/cities.service';
import { CitiesApiResponse } from '@api/model/cities-api-response';
import { HomeComponent } from './home.component';
import { City } from '@api/model/city';

const makeResponse = (
  page: number,
  limit: number,
  items: City[] = [],
): CitiesApiResponse => ({
  success: true,
  message: 'ok',
  data: {
    items,
    pagination: { page, limit, totalPages: 1, totalItems: items.length },
  },
});

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let citiesServiceMock: { getAllCities: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    citiesServiceMock = { getAllCities: vi.fn().mockReturnValue(of(makeResponse(1, 4))) };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: CitiesService, useValue: citiesServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('gets cities from API response', () => {
    const city = { name: 'Berlin' } as City;
    (citiesServiceMock.getAllCities).mockReturnValue(of(makeResponse(1, 4, [city])));

    component.onPaginationChange({ pageNumber: 0, pageSize: 4, total: 1 });
    fixture.detectChanges();

    expect(component.cities()).toEqual([city]);
  });


  it('gest empty cities when data is null', () => {
    (citiesServiceMock.getAllCities).mockReturnValue(
      of({ success: false, message: 'error', data: null } as CitiesApiResponse),
    );

    component.onPaginationChange({ pageNumber: 0, pageSize: 4 });
    fixture.detectChanges();

    expect(component.cities()).toEqual([]);
  });
});
