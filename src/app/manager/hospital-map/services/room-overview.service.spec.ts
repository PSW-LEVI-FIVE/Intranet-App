import { TestBed } from '@angular/core/testing';

import { RoomOverviewService } from './room-overview.service';

describe('RoomOverviewService', () => {
  let service: RoomOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
