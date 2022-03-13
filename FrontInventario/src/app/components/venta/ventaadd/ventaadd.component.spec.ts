import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaaddComponent } from './ventaadd.component';

describe('VentaaddComponent', () => {
  let component: VentaaddComponent;
  let fixture: ComponentFixture<VentaaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
