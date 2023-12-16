import { Injectable } from '@angular/core';
import { ProductosCreateComponent } from '../components/productos/productos-create/productos-create.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }


  openCreateProductModal(): MatDialogRef<ProductosCreateComponent> {
    return this.dialog.open(ProductosCreateComponent, {
      width: '700px', // Ajusta el ancho según tus necesidades
    });
  }
  
}
