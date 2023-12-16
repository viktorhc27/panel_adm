import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoriasService } from '../../categorias/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../productos.service';
import { MatDialogRef } from '@angular/material/dialog'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-create',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatCardModule, ReactiveFormsModule, MatInputModule, HttpClientModule, MatSelectModule,],
  providers: [CategoriasService, ProductosService],
  templateUrl: './productos-create.component.html',
  styleUrl: './productos-create.component.scss'
})
export class ProductosCreateComponent implements OnInit {
  dialogRef:any
  selectedValue!: string;
  selectedCar!: string;
  categorias: Array<any> = []
  formGroup: FormGroup;
  selectedFile: any = null;
  constructor(
    private fb: FormBuilder,
    private service: CategoriasService,
    private ProductoService: ProductosService,
    private router: Router  ) {
    this.formGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      img: [],
      image: [],
      categoria_id: []
    });
  }
  ngOnInit(): void {
    this.listar_categorias()
  }

  guardar() {
    console.log(this.selectedFile);
    console.log(this.formGroup.value);

    this.ProductoService.save(this.formGroup.value).subscribe({
      next: (res: any) => {
        this.upload(res.id, this.selectedFile);
        Swal.fire({
          title: 'Guardado exitoso',
          text: 'El formulario se ha guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          // Puedes agregar lógica adicional después de hacer clic en "Ok"
          if (result.isConfirmed) {
            // Por ejemplo, navegar a otra página
            this.router.navigate(['/producto']);
          }
        });
      },
      error: (err: any) => {
        // Manejar el error
        Swal.fire({
          title: 'Error',
          text: 'Hay un error en el formulario',
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then((result) => {
          // Puedes agregar lógica adicional después de hacer clic en "Ok"
          if (result.isConfirmed) {
            // Por ejemplo, navegar a otra página
            this.router.navigate(['/productos/create']);
          }
        });
      },
    });
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
  }

  upload(id: any, file: File) {

    this.ProductoService.uploadFile(id, file).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        // Handle error
      },
    });
  }
  listar_categorias() {
    this.service.index().subscribe({
      next: (res: any) => {
        this.categorias = res
      }, error: (err: any) => {
      }
    });
  }

  cerrarModal() {
    // Puedes usar esta función si necesitas cerrar el modal desde otro botón o acción
    this.dialogRef.close();
  }
}

