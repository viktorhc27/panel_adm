import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../../service/modal.service';
import { ProductosService } from '../productos.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-productos-index',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MatPaginatorModule,MatTableModule],
  templateUrl: './productos-index.component.html',
  styleUrl: './productos-index.component.scss',
  providers: [ProductosService]
})
export class ProductosIndexComponent implements OnInit {
  dialogRef: any
  displayedColumns: string[] = ['nombre', 'precio', 'categoria'];
  tusDatos = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private modalService: ModalService,
    private service: ProductosService) { }
  ngOnInit(): void {
    this.listar()
  }

  openCreateProductModal(): void {
    const dialogRef = this.modalService.openCreateProductModal();
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado', result);
    });
  }
  closeModal(): void {
    this.dialogRef.close();
  }

  listar() {

    this.service.index().subscribe({
      next: (res: any) => {
        this.tusDatos = new MatTableDataSource<any>(res);
        this.tusDatos.paginator = this.paginator;

      }, error: (err: any) => {

      }
    });

  }

}
