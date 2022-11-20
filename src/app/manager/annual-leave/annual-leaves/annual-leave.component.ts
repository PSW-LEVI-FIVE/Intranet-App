import { Router } from '@angular/router';
import { AnnualLeaveService } from '../services/annual-leave.service';
import { IAnnualLeave } from '../model/annual-leave.model';
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
      this.dataSource.data = this.annualLeaves;
    })
  }
  public reviewAnnualLeave(id: number) {
    this.router.navigate(['/annual-leave/' + id + '/review']);
  }

}
