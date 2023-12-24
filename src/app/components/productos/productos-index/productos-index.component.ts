import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from '../../../service/modal.service';
import { ProductosService } from '../productos.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlertService, LoadingService, NgxKuvToolsModule } from 'ngx-kuv-tools';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosCreateComponent } from '../productos-create/productos-create.component';
import { NgSelect2Module } from 'ng-select2';
import { ProductosViewComponent } from '../productos-view/productos-view.component';
import { ProductosUpdateComponent } from '../productos-update/productos-update.component';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-productos-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxKuvToolsModule, NgxKuvUtilsModule, NgSelect2Module],
  templateUrl: './productos-index.component.html',
  styleUrl: './productos-index.component.scss',
  providers: [ProductosService]
})
export class ProductosIndexComponent implements OnInit {
  apiUrl = environment.apiUrl;
  dialogRef: any

  columnas: any[] = [

    {
      label: "Nombre",
      attribute: 'nombre',
      width: 1,
      responsive: ['XS', 'SM', 'MD']
    },
    {
      label: "Categoría",
      width: 1,
      responsive: ['XS', 'SM', 'MD'],
      value: (el: any) => {
        return el.categoria?.nombre;
      }
    },
    {
      label: "Imagen",
      styled: true,
      width: 1,
      responsive: [ 'SM', 'MD'],
      value: (el: any) => {
        return '<img width=100px src=http://localhost:3000/'+el.img+'/>';
        return "<img [src]=http://localhost:3000/"+el.img+" />" 
      }
    }
  ];
  acciones: any[] = [
    {
      label: 'Detalle',
      icon: 'eye',
      action: (element: any, index: number) => {
        this.view(element);
      }
    },
    {
      label: 'Editar',
      icon: 'pen',
      action: (element: any, index: number) => {
        this.update(element);
      }
    },
    {
      label: 'Eliminar',
      icon: 'trash',
      action: (element: any, index: number) => {
        /*  this.delete(element); */
      }
    }
  ];
  filtros: any[] = [
     {
      label: 'Nombre',
      column: 'nombre',
      op: 'like'
    }, {
      label: 'Categoría',
      column: '$categoria.nombre$',
      op: 'like'
    },

  ];

  reloadEmitter: EventEmitter<string> = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private service: ProductosService,
    private loading: LoadingService,
    private alerts: AlertService
  ) { }
  ngOnInit(): void {

  }
  agregar() {
    this.modalService.open(ProductosCreateComponent, { size: 'lg', scrollable: true, backdrop: 'static' }).result.then((result: any) => {
      this.reloadEmitter.emit('true');
    }, (reason: any) => { });
  }
  view(element: any) {
    this.loading.show()
    this.service.view(element.id).subscribe({
      next: (res) => {
        this.loading.hide();
        let modalRef = this.modalService.open(ProductosViewComponent, { size: 'lg', scrollable: true, backdrop: 'static' });
        modalRef.componentInstance.element = res;
      }, error: (err) => {
        this.loading.hide();

      }
    });
  }
  update(element: any) {
    this.loading.show()
    this.service.view(element.id).subscribe({
      next: (res) => {
        this.loading.hide();
        let modalRef = this.modalService.open(ProductosUpdateComponent, { size: 'lg', scrollable: true, backdrop: 'static' });
        modalRef.componentInstance.element = res;
        this.reloadEmitter.emit('true');
      }, error: (err) => {
        this.loading.hide();

      }
    });
  }

}
