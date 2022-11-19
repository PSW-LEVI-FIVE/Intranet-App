import { TestBed } from '@angular/core/testing';

import { AnnualLeaveService } from './annual-leave.service';

describe('AnnualLeaveService', () => {
  let service: AnnualLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnualLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
