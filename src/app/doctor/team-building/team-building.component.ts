import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { ReasonDialogComponent } from './dialogs/reason-dialog.component';
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
    private readonly toast: ToastrService,
    public dialog: MatDialog
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

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ReasonDialogComponent, {
      width: '500px',
      height: '200px',
      data: { reason: "" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.trim().length == 0) {
          this.toast.error("There should be a reason for declining!")
          return
        }
        this.declineInvitation(id, result)
      }
    });
  }

  declineInvitation(id: number, reason: string) {
    this.teamBuildingService.declineInvitation(id, reason)
      .pipe(catchError(res => {
        console.log(res)
        this.toast.error("Declining invitation failed!")
        return EMPTY
      }))
      .subscribe(res => {
        this.toast.success("Sucessfully decliend invitation!")
        this.loadInvitations()
      })
  }

}
