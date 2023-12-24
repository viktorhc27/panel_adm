import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModalDeleteComponent implements OnInit {
  @Input() texto: string = "¡Atencion! Esta a punto de eliminar un elemento de la tabla.";
  @Input() textoAceptar: string = "Eliminar elemento";
  
  constructor(
    public activeModal: NgbActiveModal
  ) { }
    
  ngOnInit() { }

  guardar() {
    this.activeModal.close(true);
  }

  cancelar(){
    this.activeModal.dismiss()
  }

}
