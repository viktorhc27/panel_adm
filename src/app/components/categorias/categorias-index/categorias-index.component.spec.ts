import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasIndexComponent } from './categorias-index.component';

describe('CategoriasIndexComponent', () => {
  let component: CategoriasIndexComponent;
  let fixture: ComponentFixture<CategoriasIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
