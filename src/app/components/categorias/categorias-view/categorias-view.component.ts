import { Component, Input, OnInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { AlertService, LoadingService, NgxKuvToolsModule } from 'ngx-kuv-tools';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { CommonModule } from '@angular/common';
import { SweetAlertComponent } from '../../../utils/sweet-alert/sweet-alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorias-view',
  standalone: true,
  imports: [
    CommonModule,
    Select2Module,
    ReactiveFormsModule,
    HttpClientModule,
    NgxKuvToolsModule,
    NgxKuvUtilsModule
  ],
  templateUrl: './categorias-view.component.html',
  styleUrl: './categorias-view.component.scss',
  providers: [SweetAlertComponent]
})
export class CategoriasViewComponent implements OnInit {
  @Input() element: any = null;
  form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      nombre: []
    })
    this.form.patchValue(this.element)
    this.form.disable()
  }

}
