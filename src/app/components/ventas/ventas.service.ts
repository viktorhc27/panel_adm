import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VentasService {
  controller: string = "ventas/";
  apiUrl: string = "http://localhost:3000/api/"
  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'index');
  }
  productosMasVendidos(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'producto_mas_vendido');
  }
  list_count(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'total_ventas');
  }

  reporte_meses(fecha_inicio: any, fecha_final: any): Observable<any> {
    return this.http.post(this.apiUrl + this.controller + 'reporte_meses', { fecha_inicio, fecha_final })
  }
}
