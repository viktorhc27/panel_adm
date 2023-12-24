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
}
