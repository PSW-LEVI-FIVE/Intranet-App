import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBuildingInvitationsComponent } from './team-building-invitations.component';

describe('TeamBuildingInvitationsComponent', () => {
  let component: TeamBuildingInvitationsComponent;
  let fixture: ComponentFixture<TeamBuildingInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamBuildingInvitationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamBuildingInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
