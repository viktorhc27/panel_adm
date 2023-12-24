import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  controller: string = "productos/";
  apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }


  index(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'index');
  }
  save(producto: any): Observable<any> {
    return this.http.post(this.apiUrl + this.controller + 'save', { producto });
  }
  delete(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + this.controller + "delete/" + id);
  }
  list_count(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'total');
  }
  excel(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'excel', { responseType: 'blob' })
  }
  view(id: number): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'view/' + id,)
  }
  update(producto: any): Observable<any> {
    return this.http.post(this.apiUrl + this.controller + 'update/', {producto:producto})
  }
  uploadFile(form: FormData): Observable<any> {
    return this.http.post(this.apiUrl + this.controller + 'upload', form);
  }
  activate(data: any): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'activate/' + data.id);
  }
  deactivate(data: any): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'deactivate/' + data.id);
  }
}
