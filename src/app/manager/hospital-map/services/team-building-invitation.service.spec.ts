import { TestBed } from '@angular/core/testing';

import { TeamBuildingInvitationService } from './team-building-invitation.service';

describe('TeamBuildingInvitationService', () => {
  let service: TeamBuildingInvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamBuildingInvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
