import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { RoomMapService } from '../services/room-map.service';
import { RoomOverviewService } from '../services/room-overview.service';
export interface IEquipmentRelocation{
  startingRoomId:number,
  startAt:any,
  endAt:any
}
@Component({
  selector: 'app-equipment-relocation-overview',
  templateUrl: './equipment-relocation-overview.component.html',
  styleUrls: ['./equipment-relocation-overview.component.css']
})
export class EquipmentRelocationOverviewComponent implements OnInit {
  @Input() roomID :any
  constructor(private http:HttpClient,private roomService:RoomMapService,private toastService:ToastrService, private roomOverViewService:RoomOverviewService,private router:Router, private route: ActivatedRoute) { }
  displayedColumns: string[] = ['start_date', 'end_date', 'start_room', 'destination_room','equipment_type','cancel'];
  
  roomId:number = 0
  dataSource:IEquipmentRelocation[]=[]
  startRoomNameArray:any[]=[]
  a:any
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.roomId = params['id'];
    });
    this.roomOverViewService.GetEquipmentRelocationForRoom(this.roomId).subscribe(res=>
      {
        this.dataSource = res
        this.dataSource.forEach((leave) => { 
          leave.startAt = leave.startAt.split('T')[0]
          leave.endAt = leave.endAt.split('T')[0]
        
        })
        console.log(this.dataSource)
        for (var val of this.dataSource) {
          console.log(val.startingRoomId+"hahha"); 
          this.roomService.getByID(val.startingRoomId).subscribe(r=>{
            this.a =r
            this.startRoomNameArray.push(this.a)
            console.log(this.startRoomNameArray)
          })

        }
        
      })
      for (var val of this.dataSource) {
        console.log(val+"hahha"); // prints values: 10, 20, 30, 40
      }
  }

  CancelRellocation(id:number){
      this.roomOverViewService.CancelRellocation(id).pipe(catchError(res => {
        const error = res.error
        if (error.errors) {
          Object.keys(error.errors).forEach(key => {
            error.errors[key].forEach((err: any) => {
              this.toastService.error(err)
            });
          })
          return EMPTY
        }
        this.toastService.error(error.Message)
        return EMPTY
      }));
  }

}
