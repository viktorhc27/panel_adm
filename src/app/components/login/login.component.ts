import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [HttpClientModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [],
      password: [],
    });
  }

  login() {
    this.authService.login(this.form.controls['email'].value, this.form.controls['password'].value).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        // Lógica adicional en caso de inicio de sesión exitoso
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        // Manejo de errores
        console.error('Error en la autenticación:', err);
        // Puedes mostrar un mensaje de error o realizar acciones adicionales según tus necesidades.
      }
    });
  }
  verificar() {
    let Token = this.authService.getAuthToken()
    console.log(Token);
    
  }
}
