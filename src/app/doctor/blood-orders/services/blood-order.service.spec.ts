import { TestBed } from '@angular/core/testing';

import { BloodOrderService } from './blood-order.service';

describe('BloodOrderService', () => {
  let service: BloodOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
