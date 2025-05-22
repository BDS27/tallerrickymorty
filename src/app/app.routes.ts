import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: '',
    component:HomePage
  },
  {
    path: 'api/:id',
    loadComponent: () => import('./api/api.page').then(m => m.ApirickandmortyDetailsPage)
  }
];
