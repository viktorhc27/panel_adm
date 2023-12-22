import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosUpdateComponent } from './productos-update.component';

describe('ProductosUpdateComponent', () => {
  let component: ProductosUpdateComponent;
  let fixture: ComponentFixture<ProductosUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
