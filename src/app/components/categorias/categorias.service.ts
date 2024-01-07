import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  controller: string = "categorias/";
  apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'index');
  }
  list(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'list');
  }
  count(): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'count');
  }
  save(categoria: any): Observable<any> {
    return this.http.post(this.apiUrl + this.controller + 'save', { categoria });
  }
  delete(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + this.controller + "delete/" + id);
  }
  view(id: number): Observable<any> {
    return this.http.get(this.apiUrl + this.controller + 'view/' + id,)
  }
  update(categoria: any): Observable<any> {
    return this.http.put(this.apiUrl + this.controller + 'update/', {categoria})
  }
}
