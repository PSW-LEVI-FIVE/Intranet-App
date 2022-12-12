import { TestBed } from '@angular/core/testing';

import { ConsiliumService } from './consilium.service';

describe('ConsiliumService', () => {
  let service: ConsiliumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsiliumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
