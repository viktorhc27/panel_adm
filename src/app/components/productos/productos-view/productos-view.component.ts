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
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-productos-view',
  standalone: true,
  imports: [
    CommonModule,
    Select2Module,
    ReactiveFormsModule,
    HttpClientModule,
    NgxKuvToolsModule,
    NgxKuvUtilsModule
  ],
  templateUrl: './productos-view.component.html',
  providers: [CategoriasService, ProductosService],
  styleUrl: './productos-view.component.scss'
})
export class ProductosViewComponent implements OnInit {
  apiUrl = environment.apiUrl;
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
    this.formGroup.disable()
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

}
