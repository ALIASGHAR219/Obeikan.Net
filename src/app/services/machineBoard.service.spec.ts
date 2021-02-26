/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MachineBoardService } from './machineBoard.service';

describe('Service: MachineBoard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineBoardService]
    });
  });

  it('should ...', inject([MachineBoardService], (service: MachineBoardService) => {
    expect(service).toBeTruthy();
  }));
});
