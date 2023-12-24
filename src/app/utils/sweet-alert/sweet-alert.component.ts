import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sweet-alert',
  standalone: true,
  imports: [],
  template: '',
  styleUrl: './sweet-alert.component.scss'
})
export class SweetAlertComponent {
  showSweetAlert(icon: 'success' | 'error' | 'warning' | 'info' = 'success', position: 'top-end' | 'top-start' | 'top' | 'center' | 'center-left' | 'center-right' | 'bottom' | 'bottom-start' | 'bottom-end' = 'top-end', title: string = 'Agregado con éxito', timer: number = 1500): void {
    Swal.fire({
      position,
      icon,
      title,
      showConfirmButton: false,
      timer
    });
  }
  ToastAlert(icon: 'success' | 'error' | 'warning' | 'info' = 'success', position: 'top-end' | 'top-start' | 'top' | 'center' | 'center-left' | 'center-right' | 'bottom' | 'bottom-start' | 'bottom-end' = 'top-end', title: string = 'Agregado con éxito', timer: number = 1500): void {
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
    });
    Toast.fire({
      icon,
      title
    });
  }
}
