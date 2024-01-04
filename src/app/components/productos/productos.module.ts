import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductosIndexComponent } from './productos-index/productos-index.component';
import { ProductosCreateComponent } from './productos-create/productos-create.component';


const routes: Routes = [
  { path: 'index', component: ProductosIndexComponent },
  { path: 'create', component: ProductosCreateComponent },
  { path: '**', redirectTo: 'index' }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductosModule { }
