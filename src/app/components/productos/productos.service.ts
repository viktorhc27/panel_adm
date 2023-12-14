import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  controller: string = "productos/";
  apiUrl: string = "http://localhost:3000/api/"
  constructor(
    private http: HttpClient
  ) { }


  index(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'index');
  }
  list_count(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'total');
  }
  excel(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'excel', { responseType: 'blob' })
  }
}
