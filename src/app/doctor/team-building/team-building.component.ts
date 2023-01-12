import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { TeamBuildingInvitation } from './model/invitation.model';
import { TeamBuildingService } from './services/team-building.service';

@Component({
  selector: 'app-team-building',
  templateUrl: './team-building.component.html',
  styleUrls: ['./team-building.component.css']
})
export class TeamBuildingComponent implements OnInit {

  invitations: TeamBuildingInvitation[] = []

  constructor(
    private readonly teamBuildingService: TeamBuildingService,
    private readonly toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadInvitations()
  }


  loadInvitations() {
    this.teamBuildingService.getAllUnanswered().subscribe(res => {
      console.log(res)
      this.invitations = res;
    })
  }

  acceptInvitation(id: number) {
    this.teamBuildingService.acceptInvitation(id)
      .pipe(catchError(res => {
        this.toast.error("Accepting invitation failed!")
        return EMPTY
      }))
      .subscribe(res => {
        this.toast.success("Sucessfully accepted invitation!")
        this.loadInvitations()
      })
  }

  declineInvitation(id: number) {
    this.teamBuildingService.acceptInvitation(id)
      .pipe(catchError(res => {
        this.toast.error("Declining invitation failed!")
        return EMPTY
      }))
      .subscribe(res => {
        this.toast.success("Sucessfully decliend invitation!")
        this.loadInvitations()
      })
  }

}
