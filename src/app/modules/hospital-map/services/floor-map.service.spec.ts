import { TestBed } from '@angular/core/testing';

import { FloorMapService } from './floor-map.service';

describe('FloorMapService', () => {
  let service: FloorMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloorMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
