import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelayudasComponent } from './panelayudas.component';

describe('PanelayudasComponent', () => {
  let component: PanelayudasComponent;
  let fixture: ComponentFixture<PanelayudasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelayudasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelayudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
