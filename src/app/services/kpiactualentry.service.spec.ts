/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KpiactualentryService } from './kpiactualentry.service';

describe('Service: Kpiactualentry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KpiactualentryService]
    });
  });

  it('should ...', inject([KpiactualentryService], (service: KpiactualentryService) => {
    expect(service).toBeTruthy();
  }));
});
