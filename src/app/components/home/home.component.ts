import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../productos/productos.service';
import { HttpClientModule } from '@angular/common/http';
import { VentasService } from '../ventas/ventas.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatPaginatorModule, MatTableModule, NgxEchartsDirective],
  providers: [ProductosService, VentasService, provideEcharts()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  data: any
  tusDatos = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nombre', 'totalVendido', 'categoria'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  total: number = 0
  totalVentas: number = 0
  tipoBarra: string = "bar"//bar,pie,doughnut
  myChart: any
  dataVenta: any
  dataSource: any
  chart: any = null
  fileUrl:any
  constructor(
    private service: ProductosService,
    private el: ElementRef,
    private VentasService: VentasService,
    private sanitizer: DomSanitizer
  ) {

  }
  chartOption: EChartsOption = {
    title: {
      text: 'Ventas',
      subtext: 'Por meses',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Venta realizada',
        type: 'pie',
        radius: '60%',
        data: [] as ({ value: number; name: string; total: number }[] | undefined),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  ngOnInit(): void {
    this.list_count()
    this.total_Ventas()
    this.masVendido()
    this.grafico_ventas()

  }
  list_count() {
    this.service.list_count().subscribe({
      next: (res: any) => {
        this.total = res.count;

      }, error: (err: any) => {

        console.log(err);
      }
    });
  }

  total_Ventas() {
    this.VentasService.list_count().subscribe({
      next: (res: any) => {
        this.totalVentas = res.count;
      }, error: (err: any) => {

        console.log(err);
      }
    });
  }
  /* cargarGrafico() {
    // Destruir el gráfico anterior si existe
    if (this.myChart) {
      this.myChart.destroy();
    }

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx2 = document.getElementById('myChart') as HTMLCanvasElement;
    this.myChart = new Chart(ctx, {

      type: this.tipoBarra,
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Ventas por meses',
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(23, 162, 184, 0.2)',
            'rgba(205, 133, 63, 0.2)',
            'rgba(75, 0, 130, 0.2)',
            'rgba(255, 140, 0, 0.2)',
            'rgba(0, 128, 0, 0.2)',
            'rgba(128, 0, 128, 0.2)',
          ],

          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(23, 162, 184, 1)',
            'rgba(205, 133, 63, 1)',
            'rgba(75, 0, 130, 1)',
            'rgba(255, 140, 0, 1)',
            'rgba(0, 128, 0, 1)',
            'rgba(128, 0, 128, 1)',
          ],
          borderWidth: 1,
        }],
      },
    });
  } */
  grafico_ventas() {
    this.VentasService.index().subscribe({
      next: (res: any) => {
        this.data = res.meses//array de meses
        if (this.chartOption.series && Array.isArray(this.chartOption.series)) {
          this.chartOption.series[0].data = res.meses as { value: number; name: string; total: number; }[];
        }
      }, error: (err: any) => {

      }
    });

  }
  cambiarTipo(tipo: string) {
    switch (tipo) {
      case '1':
        this.tipoBarra = "bar"
        break
      case '2':
        this.tipoBarra = "pie"
        break
      case '3':
        this.tipoBarra = "doughnut"
        break
    }
    //this.cargarGrafico()

  }
  masVendido() {
    this.VentasService.productosMasVendidos().subscribe({
      next: (res: any) => {
        //this.dataVenta = res
        for (let i = 0; i < res.length; i++) {
          if (!res[i].totalVendido) {
            res[i].totalVendido = 0
          }
        }
        this.tusDatos = new MatTableDataSource<any>(res);
        this.tusDatos.paginator = this.paginator;
        console.log(res);

        // this.initializeDataTable(res);

      }, error: (err: any) => {
      }
    });
  }

  exportToExcel() {
    this.service.excel().subscribe(
      (archivo: Blob) => {
        // Crear un objeto de Blob con el tipo MIME del archivo
        const blob = new Blob([archivo], { type: 'application/octet-stream' });

        // Crear un enlace de descarga
        const url = window.URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;

        // Configurar el nombre del archivo
        enlace.download = 'excel.xlsx';

        // Agregar el enlace al documento y hacer clic en él
        document.body.appendChild(enlace);
        enlace.click();

        // Limpiar
        document.body.removeChild(enlace);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar el archivo', error);
        // Manejar el error según tus necesidades
      }
    );
  }
}
