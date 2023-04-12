import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictYieldComponent } from './predict-yield.component';

describe('PredictYieldComponent', () => {
  let component: PredictYieldComponent;
  let fixture: ComponentFixture<PredictYieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictYieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictYieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
