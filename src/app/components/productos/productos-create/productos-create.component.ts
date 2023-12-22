import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriasService } from '../../categorias/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../productos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxKuvToolsModule } from 'ngx-kuv-tools';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Module } from 'ng-select2-component';
import { CommonModule } from '@angular/common';
import { LoadingService, AlertService } from 'ngx-kuv-tools';
@Component({
  selector: 'app-productos-create',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    Select2Module,
    ReactiveFormsModule,
    HttpClientModule,
    NgxKuvToolsModule,
    NgxKuvUtilsModule
  ],
  providers: [CategoriasService, ProductosService],
  templateUrl: './productos-create.component.html',
  styleUrl: './productos-create.component.scss'
})
export class ProductosCreateComponent implements OnInit {

  dialogRef: any
  selectedValue!: string;
  selectedCar!: string;
  categorias: Array<any> = []
  formGroup: FormGroup;
  selectedFile: any = null;
  constructor(
    private fb: FormBuilder,
    private service: CategoriasService,
    private ProductoService: ProductosService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private loading: LoadingService,
    private alerts: AlertService
  ) {
    this.formGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      img: ['', [Validators.required]],
      categoria_id: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.listar_categorias()
  }

  guardar() {
    if (this.formGroup.valid) {
      this.loading.show();
      this.ProductoService.save(this.formGroup.value).subscribe({
        next: (res: any) => {
          this.loading.hide();
          this.upload(res.id, this.selectedFile);
          this.activeModal.close(res.model);
          this.alerts.addAlert("Producto registrado con éxito.", "success");
        },
        error: (err: any) => {
          console.error(err);
          this.loading.hide();
          this.alerts.addAlert("No se pudo guardar el registro del producto.", "danger");
          console.log(err.error.response)
          if (err.error.response) {
            this.alerts.addAlert(err.error.response, "danger");
          }
        },
      });
    } else {
      this.formGroup.markAllAsTouched();
      this.alerts.addAlert("Hay errores en el formulario.", "warning");
    }

  }



  onFileSelected(event: any): void {

    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.formGroup.get('img')?.setValue(this.selectedFile.name);
      this.formGroup.get('image')?.setValue(this.selectedFile);
    } else {
      // No file selected
      this.selectedFile = null;
    }
    /* console.log(this.selectedFile);
    console.log(this.formGroup.value); */
  }

  upload(id: any, file: File) {
    console.log(file);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('idUser', id)

    this.ProductoService.uploadFile(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.alerts.addAlert("Producto registrado con éxito.", "success");
      },
      error: (err: any) => {
        // Handle error
      },
    });
  }

  listar_categorias() {

    this.service.index().subscribe({
      next: (res: any) => {
        res.forEach((e: any) => {
          this.categorias.push(e)
        });
      }, error: (err: any) => {
        this.loading.hide();
        if (err.response) this.alerts.addAlert(err.response, 'danger');
      }

    });
  }

}

