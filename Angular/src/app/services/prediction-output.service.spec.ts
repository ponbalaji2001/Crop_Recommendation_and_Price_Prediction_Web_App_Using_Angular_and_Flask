import { TestBed } from '@angular/core/testing';

import { PredictionOutputService } from './prediction-output.service';

describe('PredictionOutputService', () => {
  let service: PredictionOutputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictionOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
