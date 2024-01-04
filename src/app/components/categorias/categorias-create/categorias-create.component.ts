import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Select2Module } from 'ng-select2-component';
import { NgxKuvToolsModule } from 'ngx-kuv-tools';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { CategoriasService } from '../categorias.service';
import { SweetAlertComponent } from '../../../utils/sweet-alert/sweet-alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorias-create',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    Select2Module,
    ReactiveFormsModule,
    HttpClientModule,
    NgxKuvToolsModule,
    NgxKuvUtilsModule],
  templateUrl: './categorias-create.component.html',
  styleUrl: './categorias-create.component.scss',
  providers: [CategoriasService, SweetAlertComponent]
})
export class CategoriasCreateComponent {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: CategoriasService,
    private alert: SweetAlertComponent,
    public activeModal: NgbActiveModal,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]

    })

  }

  guardar() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: (res: any) => {
          this.activeModal.close(res.model);
          this.alert.ToastAlert('success', 'top-end', 'Categoria registrada con éxito')

        }, error: (err: any) => {
          this.alert.ToastAlert('error', 'top-end', 'No se pudo guardar el registro del producto.', 1500);
        },
      })

    } else {
      this.form.markAllAsTouched();
      this.alert.ToastAlert('warning', 'top-end', 'Hay errores en el formulario.', 1500);

    }
  }
}
