import { TestBed } from '@angular/core/testing';

import { RenovationService } from './renovation.service';

describe('RenovationService', () => {
  let service: RenovationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenovationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
