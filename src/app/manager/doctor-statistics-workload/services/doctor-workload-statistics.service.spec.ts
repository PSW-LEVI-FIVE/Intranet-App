import { TestBed } from '@angular/core/testing';

import { DoctorWorkloadStatisticsService } from './doctor-workload-statistics.service';

describe('DoctorWorkloadStatisticsService', () => {
  let service: DoctorWorkloadStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorWorkloadStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
