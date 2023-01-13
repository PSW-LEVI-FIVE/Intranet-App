import { TestBed } from '@angular/core/testing';

import { RenovationStatisticsService } from './renovation-statistics.service';

describe('RenovationStatisticsService', () => {
  let service: RenovationStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenovationStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
