import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { RoomOverviewService } from '../services/room-overview.service';
export interface IRenovation{

  startAt:any,
  endAt:any,
  type:TypeRen
}
export enum TypeRen{
  Merge = 0,
  Split = 1,
  
}
@Component({
  selector: 'app-room-renovation-overview',
  templateUrl: './room-renovation-overview.component.html',
  styleUrls: ['./room-renovation-overview.component.css']
})
export class RoomRenovationOverviewComponent implements OnInit {

  @Input() roomID :any
  answer:any
  constructor(private http:HttpClient,private toastService:ToastrService, private roomOverViewService:RoomOverviewService,private router:Router, private route: ActivatedRoute) { }
  displayedColumns: string[] = ['start_date', 'end_date', 'renovation_type','cancel'];
  getOptionLabel(option: TypeRen) {
    switch (option) {
      case TypeRen.Merge:
        return "Merging  rooms";
      case TypeRen.Split:
        return "Spliting room";
      default:
         throw new Error("Unsupported option");
    }
  }
  roomId:number = 0
  dataSource:IRenovation[]=[]
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.roomId = params['id'];
    });
    this.roomOverViewService.GetRenovationForRoom(this.roomId).subscribe(res=>
      {
        console.log(this.roomId)
        this.dataSource = res
        this.dataSource.forEach((leave) => { 
          leave.startAt = leave.startAt.split('T')[0]
          leave.endAt = leave.endAt.split('T')[0]
        
        })
        console.log(this.dataSource)
      })
  }

  cancelRenovation(id:number){
    this.roomOverViewService.CancelRenovationForRoom(id).pipe(catchError(res => {
      const error = res.error
        console.log(res.error)
              this.toastService.error(error.Message)
              return EMPTY
            }))
            .subscribe()
    this.roomOverViewService.GetRenovationForRoom(this.roomId).subscribe(res=>
              {
                console.log(this.roomId)
                this.dataSource = res })       
  
}



}
