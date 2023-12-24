import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalDeleteComponent } from "./modal-delete.component";
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ModalDeleteComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
  ],
  entryComponents: [
    ModalDeleteComponent
  ]
})
export class ModalDeleteModule { }
