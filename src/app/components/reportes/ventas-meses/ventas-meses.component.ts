import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VentasService } from '../../ventas/ventas.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-ventas-meses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [VentasService],
  templateUrl: './ventas-meses.component.html',
  styleUrl: './ventas-meses.component.scss'
})
export class VentasMesesComponent implements OnInit {

  formGroup: FormGroup;
  datos: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private service: VentasService
  ) {
    this.formGroup = this.fb.group({
      fecha_inicio: ['', [Validators.required]],
      fecha_final: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.formGroup.controls['fecha_inicio'].setValue('2023-01-01')
    this.formGroup.controls['fecha_final'].setValue('2023-12-31')
    this.reporte()
  }

  reporte() {
    console.log(this.formGroup.value);

    this.service.reporte_meses(this.formGroup.controls['fecha_inicio'].value, this.formGroup.controls['fecha_final'].value).subscribe({
      next: (res: any) => {
        this.datos = res.reporteMeses;
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      }
    });


  }
}
