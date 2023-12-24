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
import { VentasMesesComponent } from "../reportes/ventas-meses/ventas-meses.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormatterService } from '../../utils/formatter/formatter.service';
import { NgxKuvToolsModule } from 'ngx-kuv-tools';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import Swal from 'sweetalert2';
import { SweetAlertComponent } from '../../utils/sweet-alert/sweet-alert.component';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [ProductosService, VentasService, provideEcharts(),SweetAlertComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    NgxEchartsDirective,
    VentasMesesComponent,
    NgxPaginationModule,
    NgxKuvToolsModule,
    NgxKuvUtilsModule,
    
  ]
})
export class HomeComponent implements OnInit {
  page: number = 1;
  data: any
  tusDatos = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nombre', 'totalVendido', 'categoria'];
  total: number = 0
  totalVentas: number = 0
  tipoBarra: string = "bar"//bar,pie,doughnut
  myChart: any
  dataVenta : any[] = [];
  dataSource: any
  chart: any = null
  fileUrl: any
  
  constructor(
    private service: ProductosService,
    private el: ElementRef,
    private VentasService: VentasService,
    private sanitizer: DomSanitizer,
    public formatter: FormatterService,
    private alert: SweetAlertComponent
  ) {

  }
  tableItems: any[] = [];
  tableColumns: any[] = [
    {
      label: 'Producto',
      attribute: 'nombre',
      width: 1,
      responsive: ['XS', 'SM', 'MD']
    }, {
      label: 'Total Vendido',
      width: 1,
      responsive: ['XS', 'SM', 'MD'],
      value: (element: any, index: number) => {
        return this.formatter.numberFormat(element.totalVendido)
      }
    }
  ];
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
        this.alert.ToastAlert('success', 'top-end', 'ventas cargadas', 1500);

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
        console.log(res);

        this.dataVenta = res
        for (let i = 0; i < res.length; i++) {
          if (!res[i].totalVendido) {
            res[i].totalVendido = 0
          }
        }
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
