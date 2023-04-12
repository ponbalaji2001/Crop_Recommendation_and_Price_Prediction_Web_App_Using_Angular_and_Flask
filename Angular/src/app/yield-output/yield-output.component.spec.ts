import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YieldOutputComponent } from './yield-output.component';

describe('YieldOutputComponent', () => {
  let component: YieldOutputComponent;
  let fixture: ComponentFixture<YieldOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YieldOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YieldOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
