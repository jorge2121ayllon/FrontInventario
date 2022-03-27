import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockalertaComponent } from './stockalerta.component';

describe('StockalertaComponent', () => {
  let component: StockalertaComponent;
  let fixture: ComponentFixture<StockalertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockalertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockalertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
