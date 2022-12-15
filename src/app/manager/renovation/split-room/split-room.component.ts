import { Component, OnInit } from '@angular/core';
import { Room } from '../../room/model/room.model';
import { RoomService } from '../../room/services/room.service';
import { TimeInterval } from '../shared/model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

enum RoomTypes {
  NO_TYPE,
  OPERATION_ROOM,
  EXAMINATION_ROOM,
  HOSPITAL_ROOM ,
  CAFETERIA
}

@Component({
  selector: 'app-split-room',
  templateUrl: './split-room.component.html',
  styleUrls: ['./split-room.component.css']
})
export class SplitRoomComponent implements OnInit {

  availableRoomTypes =[RoomTypes.HOSPITAL_ROOM,RoomTypes.EXAMINATION_ROOM,RoomTypes.OPERATION_ROOM,RoomTypes.CAFETERIA]
  public isLinear = false;
  public nextStep : boolean = true;
  public resumeAction: boolean = true;
  public floorId: number = 0;
  public durationInput: number = 0;
  public pick: Date = new Date()
  public floorRooms: Room[] = [];
  public selectedRoomId = 0;

  public intervals:TimeInterval[]=[];
  public selectedInterval:TimeInterval=new TimeInterval;

  constructor(private roomService: RoomService,  
              private toastService: ToastrService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.floorId = params['floorId'];
      this.loadRooms(this.floorId);
    });
  }

  public getOptionLabel(option: RoomTypes) {
    switch (option) {
      case RoomTypes.HOSPITAL_ROOM:
        return "Hospital room";
      case RoomTypes.EXAMINATION_ROOM:
        return "Examination room";
        case RoomTypes.CAFETERIA:
        return "Cafeteria";
        case RoomTypes.OPERATION_ROOM:
        return "Operation room";
      default:
         throw new Error("Unsupported option");
    }
 }

 public loadRooms(floorId: number){
  this.roomService.getRoomsbyFloor(this.floorId).subscribe(res => {
    this.floorRooms = res;
  })
 }

 public checkFirstStepInput(){
 if(this.durationInput <= 0 || this.selectedRoomId === 0){
     this.nextStep = true;
  }
  else this.nextStep = false;
}

public checkThirdStepInput(){
  
}

 public abortRenovation(){
  this.router.navigate([`manager/room-map/${this.floorId}`]);
 }

 public scheduleSplit(){
  this.router.navigate([`manager/room-map/${this.floorId}`]);
 }

}
