import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private controller = 'usuarios/';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + this.controller + 'login', { email, password });
  }

  saveToken(datos: any): void {
    localStorage.setItem('token', datos.token);
    localStorage.setItem('nombre', datos.usuario.nombre);
    localStorage.setItem('apellidos', datos.usuario.app + " " + datos.usuario.apm);
  }
  cerrar_session(){
    localStorage.removeItem('token')
    localStorage.removeItem('nombre')
    localStorage.removeItem('apelldios')
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getAuthToken(): boolean {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem('token');
    return jwtHelper.isTokenExpired(token);

  }
}
