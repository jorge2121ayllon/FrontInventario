import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioaddComponent } from './usuarioadd.component';

describe('UsuarioaddComponent', () => {
  let component: UsuarioaddComponent;
  let fixture: ComponentFixture<UsuarioaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
