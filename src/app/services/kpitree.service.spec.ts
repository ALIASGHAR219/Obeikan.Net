import { TestBed } from '@angular/core/testing';

import { KpitreeService } from './kpitree.service';

describe('KpitreeService', () => {
  let service: KpitreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KpitreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
