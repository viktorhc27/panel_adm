import { Component, EventEmitter, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { CategoriasService } from '../categorias.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService, NgxKuvToolsModule } from 'ngx-kuv-tools';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { NgSelect2Module } from 'ng-select2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertComponent } from '../../../utils/sweet-alert/sweet-alert.component';
import { CategoriasViewComponent } from '../categorias-view/categorias-view.component';
import { CategoriasUpdateComponent } from '../categorias-update/categorias-update.component';
import { ModalDeleteComponent } from '../../../utils/modal-delete/modal-delete.component';
import { CategoriasCreateComponent } from '../categorias-create/categorias-create.component';

@Component({
  selector: 'app-categorias-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxKuvToolsModule, NgxKuvUtilsModule, NgSelect2Module],
  templateUrl: './categorias-index.component.html',
  styleUrl: './categorias-index.component.scss',
  providers: [CategoriasService,SweetAlertComponent]
})
export class CategoriasIndexComponent implements OnInit {
  constructor(
    private service: CategoriasService,
    private modalService: NgbModal,
    private loading: LoadingService,
    private alert: SweetAlertComponent) {

  }
  reloadEmitter: EventEmitter<string> = new EventEmitter();
  ngOnInit(): void {

  }
  apiUrl = environment.apiUrl;
  columnas: any[] = [
    {
      label: "Nombre",
      attribute: 'nombre',
      width: 1,
      responsive: ['XS', 'SM', 'MD']
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
    }

  ];


  view(element: any) {
    this.loading.show()
    this.service.view(element.id).subscribe({
      next: (res) => {
        this.loading.hide();
        let modalRef = this.modalService.open(CategoriasViewComponent, { size: 'sm', scrollable: true, backdrop: 'static' });
        modalRef.componentInstance.element = res;
      }, error: (err) => {
        this.loading.hide();

      }
    });
  }
  update(element: any) {
    this.loading.show();
  
    this.service.view(element.id).subscribe({
      next: (res) => {
        this.loading.hide();
        let modalRef = this.modalService.open(CategoriasUpdateComponent, { size: 'lg', scrollable: true, backdrop: 'static' });
        modalRef.componentInstance.element = res;
        modalRef.result.then(() => {
          // Este código se ejecutará después de que se cierre el modal
          this.loading.show();
          this.reloadEmitter.emit('true');
          this.loading.hide();
        }).catch(() => {
          // Manejar el caso en que el modal se cierre de manera inesperada o se cancele
          this.loading.hide();
        });
      },
      error: (err) => {
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

  agregar() {
    this.modalService.open(CategoriasCreateComponent, { size: 'lg', scrollable: true, backdrop: 'static' }).result.then((result: any) => {
      this.reloadEmitter.emit('true');
    }, (reason: any) => { });
  }
}
