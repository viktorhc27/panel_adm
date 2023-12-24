import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService, NgxKuvToolsModule } from 'ngx-kuv-tools';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosCreateComponent } from '../productos-create/productos-create.component';
import { NgSelect2Module } from 'ng-select2';
import { ProductosViewComponent } from '../productos-view/productos-view.component';
import { ProductosUpdateComponent } from '../productos-update/productos-update.component';
import { environment } from '../../../../environments/environments';
import { SweetAlertComponent } from '../../../utils/sweet-alert/sweet-alert.component';
import { ModalDeleteComponent } from '../../../utils/modal-delete/modal-delete.component';

@Component({
  selector: 'app-productos-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxKuvToolsModule, NgxKuvUtilsModule, NgSelect2Module],
  templateUrl: './productos-index.component.html',
  styleUrl: './productos-index.component.scss',
  providers: [ProductosService, SweetAlertComponent]
})
export class ProductosIndexComponent implements OnInit {
  apiUrl = environment.apiUrl;
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
      responsive: ['SM', 'MD'],
      value: (el: any) => {
        return '<img width=100px src=' + this.apiUrl + el.img + '/>';
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
        this.delete(element);
      }
    },
    /* {
      icon: "toggle-on",
      label: "Activar",
      action: (element: any) => {
        this.cambiarEstado(element);
      },
      hide: (element: any, index: number) => {
        return element.estado == -1;
      }
    },
    {
      icon: "toggle-off",
      label: "Desactivar",
      action: (element: any) => {
        this.cambiarEstado(element);
      },
      hide: (element: any, index: number) => {
        return element.estado == 1;
      }
    } */
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
    private alert: SweetAlertComponent
  ) { }
  ngOnInit(): void {

  }
  agregar() {
    this.modalService.open(ProductosCreateComponent, { size: 'lg', scrollable: true, backdrop: 'static' }).result.then((result: any) => {
      this.reloadEmitter.emit('reload');
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
        this.reloadEmitter.emit('reload');
      }, error: (err) => {
        this.loading.hide();

      }
    });
  }

  loadData(): void {
    this.reloadEmitter.emit();
  }
  delete(element: any): void {
    const modalRef = this.modalService.open(ModalDeleteComponent, { windowClass: 'clear-modal', size: 'md', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.titulo = 'Eliminar Usuario';
    modalRef.componentInstance.texto = '¿Seguro que desea eliminar este registro?';
    modalRef.componentInstance.textoAceptar = 'Eliminar';
    modalRef.result.then((result) => {
      this.loading.show();
      this.service.delete(element.id).subscribe({
        next: (res: any) => {
          this.loading.hide();
          this.loadData();
          this.alert.ToastAlert('success', 'top-end', 'Producto eliminado con éxito.', 1500);
        },
        error: (err: any) => {
          console.error(err);
          this.loading.hide();
          this.alert.ToastAlert('error', 'top-end', 'No se ha podido eliminar el registro de producto..', 1500);

        }
      });
    }, (reason) => { });
  }
  recargarDatos() {
    // Emitir un evento para indicar que se deben recargar los datos
    this.reloadEmitter.emit('reload');
  }
  cambiarEstado(element: any): void {
    this.loading.show()
    if (element.estado != 1) {
      this.service.activate(element).subscribe({
        next: (res: any) => {
          this.loading.hide();
          this.reloadEmitter.emit('true');
        },
        error: (err: any) => {
          console.error(err);
          this.loading.hide();
          // this.alerts.addAlert("No se ha podido activar el registro.", "danger");
        }
      });
    } else {
      this.service.deactivate(element).subscribe({
        next: (res: any) => {
          this.loading.hide();
          this.reloadEmitter.emit('true');
        },
        error: (err: any) => {
          console.error(err);
          this.loading.hide();
          //this.alerts.addAlert("No se ha podido desactivar el registro.", "danger");
        }
      })
    }
  }
}
