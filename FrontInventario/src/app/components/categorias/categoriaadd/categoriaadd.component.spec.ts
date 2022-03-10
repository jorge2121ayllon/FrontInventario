import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaaddComponent } from './categoriaadd.component';

describe('CategoriaaddComponent', () => {
  let component: CategoriaaddComponent;
  let fixture: ComponentFixture<CategoriaaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
