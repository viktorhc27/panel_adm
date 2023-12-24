import { Injectable } from '@angular/core';
import { AlertService, LoadingService } from 'ngx-kuv-tools';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor(
    private alerts: AlertService,
    private loading: LoadingService
  ) { }

  /**
   * Cambia el formato de una fecha de "yyyy-mm-dd HH:ii:ss" a "dd-mm-yyyy HH:ii:ss"
   */
  timestampFormat(fecha: string) {
    if (fecha) {
      return fecha.substr(8, 2) + "-" + fecha.substr(5, 2) + "-" + fecha.substr(0, 4) + " " + fecha.substr(11, 8);
    } else {
      return fecha
    }
  }
  /**
   * Cambia el formato de una fecha de "yyyy-mm-dd" a "dd-mm-yyyy"
   */
  dateFormat(fecha: string) {
    if (fecha) {
      return fecha.substring(8, 10) + "-" + fecha.substring(5, 7) + "-" + fecha.substring(0, 4)
    } else {
      return fecha
    }
  }
  /**
   * Cambia el formato de una fecha de "dd-mm-yyyy" a "yyyy-mm-dd"
   */
  usaDateFormat(fecha: string) {
    if (fecha) {
      return fecha.substr(6, 4) + "-" + fecha.substr(3, 2) + "-" + fecha.substr(0, 2)
    } else {
      return fecha
    }
  }


  // Funciona independiente del largo
  formatoRUT(rut: string) { // String con formato "12345678k"
    if (!rut) return '';
    let digit = rut.slice(-1);
    let num = rut.slice(0, -1);
    let result = '';
    while (num.length > 0) {
      if (result != '') result = '.' + result;
      result = num.slice(-3) + result;
      num = num.slice(0, -3);
    }
    return result + '-' + digit;
  }

  /**
   * Retorna la concatencación de nombre y apellido
   * @param persona Object el objeto que tiene nombre y apellido
   * @param nombre string el identificador del nombre
   * @param apellido string el identificador del apellido
   * @returns 
   */
  nombreCompleto(persona: any, nombre = "nombre", apellido = "apellido") {
    if (!persona) return "";
    if (!persona[apellido]) return persona[nombre];
    return persona[nombre] + " " + persona[apellido];
  }

  

  splitString(text: string, length: number = 100, limit: number = 100): Array<string> {
    if (!text) return [''];
    if (limit == 0) return [''];
    if (text.length < length) return [text];
    return [text.substr(0, length)].concat(this.splitString(text.substr(length), length, limit--));
  }

  capitalize(texto: string) {
    return texto.substring(0, 1).toUpperCase() + texto.substring(1);
  }

  stringToComparableNumber(text: string, length: number = 10) {
    let maxCode = '000';
    // if (!text) return new Array(length).fill(maxCode).join('');
    if (!text) text = '0';
    let array = text.split('');
    if (array.length < length) array = new Array(length - array.length).fill('0').concat(array);
    let indexOfMin = array.findIndex(e => e == '-');
    if (indexOfMin != -1 && indexOfMin != 0) {
      let aux = array[indexOfMin];
      array.splice(indexOfMin, 1);
      array = [aux].concat(array);
    }
    let inverse = 0;
    array = array.map(e => {
      let res = '';
      if (e == '-') {
        inverse = 999;
        return '000';
      }
      res = Math.abs(inverse - e.charCodeAt(0)).toString();
      let aux = res.split('');
      if (aux.length < 3) aux = new Array(3 - aux.length).fill('0').concat(aux);
      return aux.join('');
    });
    return array.join('');
  }

  /**
   * Valida si el valor del carácter presionado es un número mayor o igual a cero.
   *
   * @param {KeyboardEvent} event - El evento del teclado.
   */
  validateNumber(event: KeyboardEvent) {
    // Obtener el valor del carácter presionado
    const char = event.key;

    // Verificar si el valor es un número mayor o igual a cero
    if (char.match(/[0-9]/) && Number(char) >= 0) {
      // El valor es válido, puedes procesarlo como desees
    } else {
      // El valor es inválido, puedes mostrar un mensaje de error o impedir que se ingrese
      event.preventDefault();
    }
  }

  /**
   * 
   * @param num Número sin formato
   * @param minDecimal Cantidad mínima de decimales, default 0
   * @param maxDecimal Cantidad máxima de decimales, default 2
   * @param errMsg Texto en caso de error
   * @returns El número con formato 00.000.000,00
   */
  numberFormat(num: number, minDecimal: number = 0, maxDecimal: number = 2, errMsg: string = 'N.D.') {
    try {
      return (num-0).toLocaleString('es-CL', { minimumFractionDigits: minDecimal, maximumFractionDigits: maxDecimal });
    } catch (error) {
      return errMsg;
    }
  }

  showErrorAlerts(error: any) {
    if (error.response) this.alerts.addAlert(error.response, 'danger');
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        error.errors[key].forEach((element: any) => {
          this.alerts.addAlert(element, 'danger');
        });
      })
    }
  }
}

