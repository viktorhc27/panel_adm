import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasUpdateComponent } from './categorias-update.component';

describe('CategoriasUpdateComponent', () => {
  let component: CategoriasUpdateComponent;
  let fixture: ComponentFixture<CategoriasUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
