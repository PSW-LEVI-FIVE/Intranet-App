import { TestBed } from '@angular/core/testing';

import { BuildingMapService } from './building-map.service';

describe('BuildingMapService', () => {
  let service: BuildingMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
