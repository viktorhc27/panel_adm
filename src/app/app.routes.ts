import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'productos', loadChildren: () => import('./components/productos/productos.module').then(m => m.ProductosModule), canActivate: [authGuard] },
  { path: 'categorias', loadChildren: () => import('./components/categorias/categorias.module').then(m => m.CategoriasModule), canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' }
];
