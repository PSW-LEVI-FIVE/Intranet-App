import { TestBed } from '@angular/core/testing';

import { AllergenStatsService } from './allergen-stats.service';

describe('AllergenStatsService', () => {
  let service: AllergenStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergenStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
