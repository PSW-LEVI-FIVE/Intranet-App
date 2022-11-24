import { IAnnualLeave } from './../model/annual-leave.model';
import { Router } from '@angular/router';
import { AnnualLeaveService } from '../services/annual-leave.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-annual-leave',
  templateUrl: './annual-leave.component.html',
  styleUrls: ['./annual-leave.component.css']
})
export class AnnualLeaveComponent implements OnInit {

  public dataSource = new MatTableDataSource<IAnnualLeave>();
  public displayedColumns = ['Doctor', 'Starting', 'Ending', 'State', 'Urgent', 'Review' ];
  public annualLeaves: IAnnualLeave[] = [];
  constructor(private annualLeaveService:AnnualLeaveService, private router:Router) { }

  ngOnInit(): void {
    this.annualLeaveService.getAnnualLeaves().subscribe(res => {
      this.annualLeaves = res;
      this.annualLeaves.forEach((leave) => { 
        leave.startAt = leave.startAt.split('T')[0]
        leave.endAt = leave.endAt.split('T')[0]
        leave.state = this.getState(leave.state);
      })
      this.dataSource.data = this.annualLeaves;
    })
  }
  public reviewAnnualLeave(id: number) {
    this.router.navigate(['manager/annual-leave/' + id + '/review']);
  }
  public getState(state:any){
    let newState = '';
    if(state == '0')
      newState = 'Pending';
    else if(state == '1')
      newState = 'Approved';
    else if(state == '2')
      newState = 'Deleted';
    else if(state == '3')
      newState = 'Rejeceted';
    return newState;
  }

}
