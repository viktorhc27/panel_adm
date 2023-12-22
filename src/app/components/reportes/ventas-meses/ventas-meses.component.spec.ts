import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasMesesComponent } from './ventas-meses.component';

describe('VentasMesesComponent', () => {
  let component: VentasMesesComponent;
  let fixture: ComponentFixture<VentasMesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasMesesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasMesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
