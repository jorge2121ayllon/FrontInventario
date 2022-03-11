import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosaddComponent } from './productosadd.component';

describe('ProductosaddComponent', () => {
  let component: ProductosaddComponent;
  let fixture: ComponentFixture<ProductosaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
