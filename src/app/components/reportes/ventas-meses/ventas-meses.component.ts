import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VentasService } from '../../ventas/ventas.service';
import { HttpClientModule } from '@angular/common/http';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
@Component({
  selector: 'app-ventas-meses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsDirective

  ],
  providers: [VentasService, provideEcharts()],
  templateUrl: './ventas-meses.component.html',
  styleUrl: './ventas-meses.component.scss'
})
export class VentasMesesComponent implements OnInit {
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar'
      }
    ]
  };



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
    this.service.reporte_meses(this.formGroup.controls['fecha_inicio'].value, this.formGroup.controls['fecha_final'].value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.datos = res.reporteMeses;

        // Verificar si 'xAxis' existe y es del tipo correcto
        if (this.chartOption.xAxis && 'data' in this.chartOption.xAxis) {
          this.chartOption.xAxis.data = this.datos.map((item: any) => item.mes);
        }

        if (this.chartOption.series && Array.isArray(this.chartOption.series)) {
          this.chartOption.series[0].data = this.datos.map((item: any) => item.total);
        }


        console.log(this.chartOption);
      },
      error: (err: any) => {
        console.error(err);
      }
    });


  }

}
