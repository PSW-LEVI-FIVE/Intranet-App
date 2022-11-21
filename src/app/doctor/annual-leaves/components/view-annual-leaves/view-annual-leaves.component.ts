import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AnnualLeaveService } from '../../services/annual-leave.service';
import {catchError, EMPTY} from "rxjs";

export const enum AnnualLeaveState { PENDING, APPROVED, DELETED, CANCELED}

export interface AnnualLeave{
    id:number;
    reason:string;
    startAt:Date;
    endAt:Date;
    state: AnnualLeaveState;
    isUrgent: boolean;
}


@Component({
  selector: 'app-view-annual-leaves',
  templateUrl: './view-annual-leaves.component.html',
  styleUrls: ['./view-annual-leaves.component.css']
})
export class ViewAnnualLeavesComponent implements OnInit {

  public annualLeaves: AnnualLeave[]=[]
  public columns:string[]=["ID","Reason","Start At","End At","State","Is Urgent"]
  public selectedAnnualLeaveID:number = -1;

  constructor(    private readonly annualLeaveService: AnnualLeaveService,
                  private readonly toastService: ToastrService) { }

  ngOnInit(): void {
    this.getAnnualLeaves()
  }

  getAnnualLeaves(){
    const id=2;
    this.annualLeaveService.getAnnualLeaves(id)
      .subscribe(result=>{
        this.annualLeaves=result
      })
  }

  format(dt: Date | null) {
    if (dt == null) return ""
    let date = new Date(dt)
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  selectAnnualLeave(leaveID:number){
    if(this.selectedAnnualLeaveID==leaveID){
      this.selectedAnnualLeaveID=-1;
    }else{
      this.selectedAnnualLeaveID=leaveID;
    }
  }

  delete() {
    const isSure=confirm("Are you sure you want to delete selected Annual Leave?")
    if(!isSure)
      return
    this.annualLeaveService.delete(this.selectedAnnualLeaveID)
      .pipe(catchError( (res)=>{
        this.toastService.error(res.error.Message)
        return EMPTY
      }))
      .subscribe(result=>{
        this.getAnnualLeaves()
        this.toastService.success("Successfully deleted Annual Leave!")
      })
  }
}
