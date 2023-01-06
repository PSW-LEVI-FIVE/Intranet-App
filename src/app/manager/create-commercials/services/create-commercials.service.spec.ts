import { TestBed } from '@angular/core/testing';

import { CreateCommercialsService } from './create-commercials.service';

describe('CreateCommercialsService', () => {
  let service: CreateCommercialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCommercialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
