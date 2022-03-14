import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaeditComponent } from './ventaedit.component';

describe('VentaeditComponent', () => {
  let component: VentaeditComponent;
  let fixture: ComponentFixture<VentaeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
