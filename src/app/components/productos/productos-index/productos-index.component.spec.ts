import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosIndexComponent } from './productos-index.component';

describe('ProductosIndexComponent', () => {
  let component: ProductosIndexComponent;
  let fixture: ComponentFixture<ProductosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
