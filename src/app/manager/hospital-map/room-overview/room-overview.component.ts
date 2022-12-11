import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RoomOverviewService } from '../services/room-overview.service';

@Component({
  selector: 'app-room-overview',
  templateUrl: './room-overview.component.html',
  styleUrls: ['./room-overview.component.css']
})
export class RoomOverviewComponent implements OnInit {

  displayedColumns: string[] = ['start_date', 'end_date', 'start_time', 'end_time','appointment_type'];
  
  roomId:any
  dataSource:any
  constructor(private http:HttpClient, private roomOverViewService:RoomOverviewService) { }

  ngOnInit(): void {
    this.roomOverViewService.GetRoomSchedule(this.roomId).subscribe(res=>
      {
        this.dataSource = res
      })

  }

  

}
