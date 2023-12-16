import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'productos', loadComponent: () => import('./components/productos/productos-index/productos-index.component').then(m => m.ProductosIndexComponent) },
    { path: 'productos/create', loadComponent: () => import('./components/productos/productos-create/productos-create.component').then(m => m.ProductosCreateComponent) },
    { path: '**', redirectTo: 'home' }
];
