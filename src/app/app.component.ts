import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CommonModule, AuthService, HttpClientModule]
})
export class AppComponent {
  title = 'panel_adm';
  //nombre_completo = localStorage.getItem('nombre') + " " + localStorage.getItem('apellidos')

  constructor(private router: Router, private service: AuthService) { }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  cerrar_sesion() {
    this.service.cerrar_session()

    this.router.navigate(['/login']);
  }
}
