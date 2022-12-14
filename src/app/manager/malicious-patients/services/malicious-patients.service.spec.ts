import { TestBed } from '@angular/core/testing';

import { MaliciousPatientsService } from './malicious-patients.service';

describe('MaliciousPatientsService', () => {
  let service: MaliciousPatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaliciousPatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
