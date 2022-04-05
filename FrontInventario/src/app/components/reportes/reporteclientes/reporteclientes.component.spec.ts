import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteclientesComponent } from './reporteclientes.component';

describe('ReporteclientesComponent', () => {
  let component: ReporteclientesComponent;
  let fixture: ComponentFixture<ReporteclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteclientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
