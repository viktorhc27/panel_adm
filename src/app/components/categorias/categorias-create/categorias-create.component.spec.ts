import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasCreateComponent } from './categorias-create.component';

describe('CategoriasCreateComponent', () => {
  let component: CategoriasCreateComponent;
  let fixture: ComponentFixture<CategoriasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
