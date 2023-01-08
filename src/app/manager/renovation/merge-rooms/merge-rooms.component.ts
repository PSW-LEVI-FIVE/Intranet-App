import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { Room } from '../../room/model/room.model';
import { RoomService } from '../../room/services/room.service';
import { ToastrService } from 'ngx-toastr';
import { MergeDTO, TimeInterval, TimeSlotRegDTO } from '../shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomMapService } from '../../hospital-map/services/room-map.service';
import { RenovationService } from '../services/renovation.service';

enum RoomTypes {
  NO_TYPE,
  OPERATION_ROOM,
  EXAMINATION_ROOM,
  HOSPITAL_ROOM ,
  CAFETERIA
}

@Component({
  selector: 'app-merge-rooms',
  templateUrl: './merge-rooms.component.html',
  styleUrls: ['./merge-rooms.component.css']
})
export class MergeRoomsComponent implements OnInit {
  
  availableRoomTypes =[RoomTypes.HOSPITAL_ROOM,RoomTypes.EXAMINATION_ROOM,RoomTypes.OPERATION_ROOM,RoomTypes.CAFETERIA]
  public isLinear = false;
  public nextStep : boolean = true;
  public resumeAction: boolean = true;
  public finishAction: boolean = true;
  public schedule: boolean = true;
  public floorId: number = 0;
  public durationInput: number = 0;
  public pick: TimeInterval = new TimeInterval();
  public floorRooms: Room[] = [];
  public selectedFirstRoomId = 0;
  public selectedSecondRoomId= 0;
  public productRoomName: string = '';
  public productRoomType: RoomTypes = RoomTypes.NO_TYPE;

  public intervals:TimeInterval[]=[];
  public selectedInterval:TimeInterval = new TimeInterval();
  public mergeDto: MergeDTO = new MergeDTO();
  public timeSlotDto: TimeSlotRegDTO = new TimeSlotRegDTO();
  
  
  constructor(private roomService: RoomService,  
              private toastService: ToastrService,
               private router: Router,
               private route: ActivatedRoute,
               private roomMapService: RoomMapService,
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
     if(this.selectedFirstRoomId === this.selectedSecondRoomId && this.selectedSecondRoomId !== 0 && this.selectedFirstRoomId !== 0){
        this.toastService.info('Please select two DIFFERENT rooms');
        this.nextStep = true;
     }else if(this.durationInput <= 0 || this.selectedFirstRoomId === 0 || this.selectedSecondRoomId === 0 || this.pick.end === null){
        this.nextStep = true;
     }
     else this.nextStep = false;
 }

 public checkThirdStepInput(){
  if(this.productRoomType !== RoomTypes.NO_TYPE && this.productRoomName !== '')
    this.finishAction = false;
  else
    this.finishAction = true;
 }

 public abortRenovation(){
  this.router.navigate([`manager/room-map/${this.floorId}`]);
 }

 public scheduleMerge(){
  if(this.finishAction || this.nextStep)
    this.schedule = true;
  else{
    this.schedule = false;
    this.mergeDto.mainRoomId = this.selectedFirstRoomId;
    this.mergeDto.secondaryId = this.selectedSecondRoomId;
    this.mergeDto.startDate = this.selectedInterval.start;
    this.mergeDto.endDate = this.selectedInterval.end;
    this.renovationService.createMerge(this.mergeDto).subscribe(response => {
      this.toastService.info('Renovation scheduling is completed');
      this.router.navigate([`manager/room-map/${this.floorId}`]);
    })
  }
 }

 public getFreeAppointments(){
  this.timeSlotDto.duration = this.durationInput;
  this.timeSlotDto.roomId = this.selectedFirstRoomId;
  this.timeSlotDto.startDate = this.pick.start;
  this.timeSlotDto.endDate = this.pick.end;
  this.timeSlotDto.endDate.setDate( this.pick.end.getDate() + 1 );
  this.renovationService.getTimeSlots(this.timeSlotDto).subscribe(response=>{
    this.intervals = response;
  })
 }
}
