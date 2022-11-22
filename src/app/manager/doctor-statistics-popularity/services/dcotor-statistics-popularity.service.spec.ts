import { TestBed } from '@angular/core/testing';

import { DcotorStatisticsPopularityService } from './dcotor-statistics-popularity.service';

describe('DcotorStatisticsPopularityService', () => {
  let service: DcotorStatisticsPopularityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcotorStatisticsPopularityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
