import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoomOverviewService } from '../services/room-overview.service';
export interface IRoomAppointment {
  doctorId: number;
  patientId: number | null;
  roomId: number | null;
  startAt: any;
  endAt: any;
  type:Type;
}
export enum Type{
  Examination = 0,
  Hospitalisation = 1,
  Type3 = 2,
  Type4 = 3
}
@Component({
  selector: 'app-room-overview',
  templateUrl: './room-overview.component.html',
  styleUrls: ['./room-overview.component.css']
})
export class RoomOverviewComponent implements OnInit {

  displayedColumns: string[] = ['start_date', 'end_date','appointment_type'];
  
  roomId:number = 0
  dataSource:IRoomAppointment[]=[]
  Type = Type
  constructor(private http:HttpClient, private roomOverViewService:RoomOverviewService,private router:Router, private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.roomId = params['id'];
    });
    this.roomOverViewService.GetRoomSchedule(this.roomId).subscribe(res=>
      {
        console.log(this.roomId)
        this.dataSource = res
        this.dataSource.forEach((leave) => { 
          leave.startAt = leave.startAt.split('T')[0]+" "+ leave.startAt.split('T')[1]
          leave.endAt = leave.endAt.split('T')[0] +" "+ leave.endAt.split('T')[1]
        
        })
        console.log(this.dataSource)
      })

  }

  

}
