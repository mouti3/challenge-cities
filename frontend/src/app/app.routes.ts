import { Routes } from '@angular/router';
import { NotImplementedComponent } from '@feature/not-implemented/not-implemented.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@feature/features.routes').then((m) => m.FEATURE_ROUTES),
  },
  { path: '**', redirectTo: 'page-not-implemented', pathMatch: 'full' },
  { path: 'page-not-implemented', component: NotImplementedComponent },
];
