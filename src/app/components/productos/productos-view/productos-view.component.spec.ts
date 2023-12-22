import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosViewComponent } from './productos-view.component';

describe('ProductosViewComponent', () => {
  let component: ProductosViewComponent;
  let fixture: ComponentFixture<ProductosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
