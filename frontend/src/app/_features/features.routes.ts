import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'cities',
    pathMatch: 'full',
  },
  {
    path: 'cities',
    loadChildren: () => import('@feature/cities/cities.routes').then((m) => m.CITIES_ROUTES),
  },
];
