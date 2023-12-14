import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'productos', loadComponent: () => import('./components/productos/productos-index/productos-index.component').then(m => m.ProductosIndexComponent) },
    { path: '**', redirectTo: 'home' }
];
