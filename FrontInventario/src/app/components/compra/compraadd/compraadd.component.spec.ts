import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraaddComponent } from './compraadd.component';

describe('CompraaddComponent', () => {
  let component: CompraaddComponent;
  let fixture: ComponentFixture<CompraaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
