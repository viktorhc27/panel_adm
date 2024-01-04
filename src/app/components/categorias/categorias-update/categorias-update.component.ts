import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { LoadingService, NgxKuvToolsModule } from 'ngx-kuv-tools';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { SweetAlertComponent } from '../../../utils/sweet-alert/sweet-alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-categorias-update',
  standalone: true,
  imports: [
    CommonModule,
    Select2Module,
    ReactiveFormsModule,
    HttpClientModule,
    NgxKuvToolsModule,
    NgxKuvUtilsModule],
  templateUrl: './categorias-update.component.html',
  styleUrl: './categorias-update.component.scss',
  providers: [SweetAlertComponent,CategoriasService]
})
export class CategoriasUpdateComponent {
  @Input() element: any = null;
  form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private service :CategoriasService,
    private alert: SweetAlertComponent,
    private loading: LoadingService,
  ) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      nombre: []
    })
    this.form.patchValue(this.element)
  }
  update() {
    if (this.form.valid) {
      this.loading.show();
      this.service.update(this.form.value).subscribe({
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
      this.form.markAllAsTouched();
      this.alert.ToastAlert('warning', 'top-end', "Hay errores en el formulario.", 1500);
      
    }

  }
}
