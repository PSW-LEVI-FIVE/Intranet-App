import { Component, OnInit } from '@angular/core';
import { TeamBuildingInvitationService } from '../hospital-map/services/team-building-invitation.service';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  constructor(private invitationService:TeamBuildingInvitationService) { }
  invitationRequests:any
  ngOnInit(): void {
  }

}
