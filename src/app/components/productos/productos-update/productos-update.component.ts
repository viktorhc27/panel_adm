import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriasService } from '../../categorias/categorias.service';
import { ProductosService } from '../productos.service';
import { AlertService, LoadingService, NgxKuvToolsModule } from 'ngx-kuv-tools';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Select2Module } from 'ng-select2-component';
import { HttpClientModule } from '@angular/common/http';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { SweetAlertComponent } from '../../../utils/sweet-alert/sweet-alert.component';

@Component({
  selector: 'app-productos-update',
  standalone: true,
  imports: [
    CommonModule,
    Select2Module,
    ReactiveFormsModule,
    HttpClientModule,
    NgxKuvToolsModule,
    NgxKuvUtilsModule
  ],
  providers: [CategoriasService, ProductosService,SweetAlertComponent],
  templateUrl: './productos-update.component.html',
  styleUrl: './productos-update.component.scss'
})
export class ProductosUpdateComponent implements OnInit {

  @Input() element: any = null
  formGroup: FormGroup = new FormGroup({});
  categorias: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: CategoriasService,
    private ProductoService: ProductosService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private loading: LoadingService,
    private alert: SweetAlertComponent
  ) {

  }
  ngOnInit(): void {
    this.index_select()
    this.formGroup = this.formBuilder.group({
      id: [],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      img: ['', [Validators.required]],
      categoria_id: ['', [Validators.required]],
    });
    this.formGroup.patchValue(this.element);
  }

  index_select() {
    this.service.index().subscribe({
      next: (res) => {
        this.categorias = res
        this.alert.ToastAlert('success', 'top-end', 'categorias cargadas', 1500);
      }, error: (err) => {
        console.error(err);
        this.loading.hide();
        this.alert.ToastAlert('error', 'top-end', 'No se pudo Cargar categorias', 1500);
       
        if (err.error.msg) {
          this.alert.ToastAlert('error', 'top-end', err.error.msg, 1500);
         
        }
        if (err.error.errors[0]) {
          this.alert.ToastAlert('error', 'top-end', err.error.errors[0].msg, 1500);
        
        }
      }
    })
  }

  update() {
    if (this.formGroup.valid) {
      this.loading.show();
      this.ProductoService.update(this.formGroup.value).subscribe({
        next: (res) => {
          this.loading.hide();
          this.activeModal.close(res.model);
          this.alert.ToastAlert('success', 'top-end', res.response, 1500);
        
          this.alert.ToastAlert('success', 'top-end', 'Producto Modificado con éxito.', 1500);
        },
        error: (err) => {
          console.error(err);
          this.loading.hide();
          this.alert.ToastAlert('error', 'top-end', 'No se pudo guardar el registro del producto.', 1500);
       
          if (err.error.msg) {
            this.alert.ToastAlert('error', 'top-end', err.error.msg, 1500);
          }
          if (err.error.errors[0]) {
            this.alert.ToastAlert('error', 'top-end', err.error.errors[0].msg, 1500);
          }
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
      this.alert.ToastAlert('warning', 'top-end', "Hay errores en el formulario.", 1500);
      
    }

  }

}
