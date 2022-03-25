import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraeditComponent } from './compraedit.component';

describe('CompraeditComponent', () => {
  let component: CompraeditComponent;
  let fixture: ComponentFixture<CompraeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
