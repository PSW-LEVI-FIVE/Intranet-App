import { TestBed } from '@angular/core/testing';

import { DoctorsLeaveStatisticsService } from './doctors-leave-statistics.service';

describe('DoctorsLeaveStatisticsService', () => {
  let service: DoctorsLeaveStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorsLeaveStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
