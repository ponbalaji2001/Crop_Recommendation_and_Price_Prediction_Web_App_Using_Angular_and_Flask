import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOuputComponent } from './price-ouput.component';

describe('PriceOuputComponent', () => {
  let component: PriceOuputComponent;
  let fixture: ComponentFixture<PriceOuputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceOuputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceOuputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
