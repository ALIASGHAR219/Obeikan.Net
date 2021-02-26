/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KpimasterService } from './kpimaster.service';

describe('Service: Kpimaster', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KpimasterService]
    });
  });

  it('should ...', inject([KpimasterService], (service: KpimasterService) => {
    expect(service).toBeTruthy();
  }));
});
