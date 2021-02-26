/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WelcombannerService } from './welcombanner.service';

describe('Service: Welcombanner', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WelcombannerService]
    });
  });

  it('should ...', inject([WelcombannerService], (service: WelcombannerService) => {
    expect(service).toBeTruthy();
  }));
});
