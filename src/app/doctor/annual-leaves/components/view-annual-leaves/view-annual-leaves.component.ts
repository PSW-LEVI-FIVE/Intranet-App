import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AnnualLeaveService } from '../../services/annual-leave.service';

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
        console.log(result)
      })
  }

  format(dt: Date | null) {
    if (dt == null) return ""
    let date = new Date(dt)
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

}
