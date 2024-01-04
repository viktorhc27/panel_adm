import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasIndexComponent } from './categorias-index/categorias-index.component';
import { CategoriasCreateComponent } from './categorias-create/categorias-create.component';


const routes: Routes = [
  { path: 'index', component: CategoriasIndexComponent },
  { path: 'create', component: CategoriasCreateComponent },
  { path: '**', redirectTo: 'index' }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CategoriasModule { }
