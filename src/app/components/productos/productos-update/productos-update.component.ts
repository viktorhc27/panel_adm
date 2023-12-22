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
  providers: [CategoriasService, ProductosService],
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
    private alerts: AlertService
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
      }, error: (err) => {
        console.error(err);
        this.loading.hide();
        this.alerts.addAlert("No se pudo Cargar categorias", "danger");
        if (err.error.msg) {
          this.alerts.addAlert(err.error.msg, "danger");
        }
        if (err.error.errors[0]) {
          this.alerts.addAlert(err.error.errors[0].msg, "danger");
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
          this.alerts.addAlert(res.response, "success");
        },
        error: (err) => {
          console.error(err);
          this.loading.hide();
          this.alerts.addAlert("No se pudo guardar el registro del producto.", "danger");
          if (err.error.msg) {
            this.alerts.addAlert(err.error.msg, "danger");
          }
          if (err.error.errors[0]) {
            this.alerts.addAlert(err.error.errors[0].msg, "danger");
          }
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
      this.alerts.addAlert("Hay errores en el formulario.", "warning");
    }

  }

}
