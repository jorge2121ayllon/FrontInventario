import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockdetalleComponent } from './stockdetalle.component';

describe('StockdetalleComponent', () => {
  let component: StockdetalleComponent;
  let fixture: ComponentFixture<StockdetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockdetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
