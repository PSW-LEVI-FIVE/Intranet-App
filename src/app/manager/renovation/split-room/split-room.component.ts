import { Component, OnInit } from '@angular/core';
import { Room } from '../../room/model/room.model';
import { RoomService } from '../../room/services/room.service';
import { SplitDTO, TimeInterval, TimeSlotRegDTO } from '../shared/model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RenovationService } from '../services/renovation.service';

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
  public finishAction: boolean = true;
  public schedule: boolean = true;
  public floorId: number = 0;
  public durationInput: number = 0;
  public pick: TimeInterval = new TimeInterval()
  public floorRooms: Room[] = [];
  public selectedRoomId = 0;
  public producedRoomName1: string = '';
  public producedRoomType1: RoomTypes = RoomTypes.NO_TYPE;
  public producedRoomName2: string = '';
  public producedRoomType2: RoomTypes = RoomTypes.NO_TYPE;

  public intervals:TimeInterval[]=[];
  public selectedInterval:TimeInterval=new TimeInterval();
  public splitDto: SplitDTO = new SplitDTO();
  public timeSlotDto: TimeSlotRegDTO = new TimeSlotRegDTO();

  constructor(private roomService: RoomService,  
              private toastService: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private renovationService: RenovationService) { }

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
 if(this.durationInput <= 0 || this.selectedRoomId === 0 || this.pick.end === null){
     this.nextStep = true;
  }
  else this.nextStep = false;
}

public checkSecondStepInput(){
  this.resumeAction = false;
 }

 public checkThirdStepInput(){
  if(this.producedRoomType1 !== RoomTypes.NO_TYPE && this.producedRoomName1 !== '')
    this.finishAction = false;
  else
    this.finishAction = true;
 }

 public abortRenovation(){
  this.router.navigate([`manager/room-map/${this.floorId}`]);
 }

 public scheduleSplit(){
    this.schedule = true;
    this.splitDto.mainRoomId = this.selectedRoomId;
    this.splitDto.roomName = this.producedRoomName1;
    this.splitDto.startDate = this.selectedInterval.start;
    this.splitDto.endDate = this.selectedInterval.end;
    this.renovationService.createSplit(this.splitDto).subscribe(response =>{
      this.toastService.info('Renovation scheduling is completed');
      this.router.navigate([`manager/room-map/${this.floorId}`]);
    })
 }

 public getFreeAppointments(){
  this.timeSlotDto.duration = this.durationInput;
  this.timeSlotDto.roomId = this.selectedRoomId;
  this.timeSlotDto.startDate = this.pick.start;
  this.timeSlotDto.endDate = this.pick.end;
  this.timeSlotDto.endDate.setDate( this.pick.end.getDate() + 1 );
  this.renovationService.getTimeSlots(this.timeSlotDto).subscribe(response =>{
    this.intervals = response;
  })
}

}
