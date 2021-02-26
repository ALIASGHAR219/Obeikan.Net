/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LossanalysisService } from './lossanalysis.service';

describe('Service: Lossanalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LossanalysisService]
    });
  });

  it('should ...', inject([LossanalysisService], (service: LossanalysisService) => {
    expect(service).toBeTruthy();
  }));
});
