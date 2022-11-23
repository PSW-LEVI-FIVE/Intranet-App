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
      console.log(res);
      for(let i = 0; i < this.annualLeaves.length; i++){
        if(this.annualLeaves[i].state=="0")
          this.annualLeaves[i].state="Pending";
        else if(this.annualLeaves[i].state=="1")
          this.annualLeaves[i].state="Approved";
        else if(this.annualLeaves[i].state=="2")
          this.annualLeaves[i].state="Deleted";
        else if(this.annualLeaves[i].state=="3")
          this.annualLeaves[i].state="Rejected";
      }
      for(let i = 0; i < this.annualLeaves.length; i++){
        this.annualLeaves[i].startAt=this.annualLeaves[i].startAt.split('T')[0];
        this.annualLeaves[i].endAt=this.annualLeaves[i].endAt.split('T')[0];
      }
      this.dataSource.data = this.annualLeaves;
    })
  }
  public reviewAnnualLeave(id: number) {
    this.router.navigate(['manager/annual-leave/' + id + '/review']);
  }

}
