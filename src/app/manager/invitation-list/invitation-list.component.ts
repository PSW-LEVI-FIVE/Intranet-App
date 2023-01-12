import { Component, OnInit } from '@angular/core';
import { TeamBuildingInvitationService } from '../hospital-map/services/team-building-invitation.service';
export interface InvitationRequest {
  description: string,
  doctorId: number,
  endAt: any,
  id: number,
  invitationStatus: any,
  place: string,
  reason: string,
  startAt: any,
  title: string,
  doctorName: string

}

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  constructor(private invitationService: TeamBuildingInvitationService) { }
  invitationRequests: InvitationRequest[] = []
  doctor: any
  ngOnInit(): void {
    this.invitationService.getAllInvitationRequests().subscribe(res => {
      this.invitationRequests = res
      this.invitationRequests.forEach((leave) => {
        leave.startAt = leave.startAt.split('T')[0]
        leave.endAt = leave.endAt.split('T')[0]
        this.invitationService.getDoctorById(leave.doctorId).subscribe(res => {
          this.doctor = res
          leave.doctorName = this.doctor.name + " " + this.doctor.surname

        })

      })
    })
  }
  getOptionLabel(option: any) {
    switch (option) {
      case 0:
        return "ACCEPTED";
      case 1:
        return "REJECTED";
      case 2:
        return "PENDING";
      default:
        throw new Error("Unsupported option");
    }
  }

}
