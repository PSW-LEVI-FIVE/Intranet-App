import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { Room } from '../../room/model/room.model';
import { RoomService } from '../../room/services/room.service';
import { ToastrService } from 'ngx-toastr';
import { TimeInterval, TimeSlotRegDTO } from '../shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomMapService } from '../../hospital-map/services/room-map.service';
import { RenovationService } from '../services/renovation.service';
import { MergeDTO } from '../shared/merge.model';
import { IRoom } from '../../hospital-map/model/room.model';
import { RenovationEventDto } from '../shared/renovation-event-dto';
import { CreateEventDto } from '../shared/create-event-dto';
import { AddEventDto } from '../shared/add-event-dto';
import { RenovationDto } from '../shared/renovation-dto';

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
  public finishAction: boolean = true;
  public schedule: boolean = true;
  public floorId: number = 0;
  public floorRooms: Room[] = [];
  public productRoomName: string = '';
  public productRoomType: RoomTypes = RoomTypes.NO_TYPE;
  public intervals:TimeInterval[]=[];
  public selectedInterval:TimeInterval = new TimeInterval();
  public mergeDto: MergeDTO = new MergeDTO();
  public timeSlotDto: TimeSlotRegDTO = new TimeSlotRegDTO();
  private selectedRooms: IRoom[] | undefined;
  public renovationEventDto: RenovationEventDto = new RenovationEventDto();
  public createEventDto: CreateEventDto = new CreateEventDto();
  public addEventDto: AddEventDto = new AddEventDto();
  public renovationDto: RenovationDto = new RenovationDto();

  months: any = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
  }
  
  constructor(private roomService: RoomService,  
              private toastService: ToastrService,
               private router: Router,
               private route: ActivatedRoute,
               private roomMapService: RoomMapService,
               private renovationService: RenovationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.floorId = params['floorId'];
    });

    this.selectedRooms = <IRoom[]>history.state.data;
    
    if (!this.selectedRooms) {
      this.toastService.error('There are no selected rooms');
      this.router.navigate([`manager/room-map/${this.floorId}`]);
    }

    this.mergeDto.mainRoomId = +this.selectedRooms[0].id;

    let stringBuilder = '';
    this.selectedRooms.slice(1).forEach(room => {
      stringBuilder =  stringBuilder.concat((stringBuilder === '' ? '' : ',') + room.id);
    });
    
    this.mergeDto.secondaryIds = stringBuilder;
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


 public checkFirstStepInput() {
    this.nextStep = (this.timeSlotDto.duration <= 0 || this.timeSlotDto.endDate === null);
   /* this.createEventDto.mainRoomId = this.mergeDto.mainRoomId;
     this.createEventDto.type = 0;
     this.renovationService.createEvent(this.createEventDto).subscribe(resposne=>{
        this.renovationEventDto = resposne;
     })*/
 }

 public checkThirdStepInput(){
  if(this.productRoomType !== RoomTypes.NO_TYPE && this.productRoomName !== '')
    this.finishAction = false;
  else
    this.finishAction = true;
 }

 public approveRenovation(){
  if(this.finishAction || this.nextStep) this.schedule = true;
  else this.schedule = false;
 }

 public abortRenovation(){
  this.router.navigate([`manager/room-map/${this.floorId}`]);
 }

 public getFreeAppointments(){
  this.timeSlotDto.roomId = this.mergeDto.mainRoomId;
  this.timeSlotDto.endDate.setDate( this.timeSlotDto.endDate.getDate() + 1 );
  this.renovationService.getTimeSlots(this.timeSlotDto).subscribe(response=>{
    this.intervals = response;
  })
 }

 public addEvent(type: number){
  this.addEventDto.eventType = type;
  this.addEventDto.renovationId = this.renovationEventDto.id;
  this.addEventDto.type = this.renovationEventDto.type;
  this.addEventDto.uuid = this.renovationEventDto.uuid;
  this.addEventDto.time.setHours(this.addEventDto.time.getHours()+1)
  this.renovationService.addEvent(this.addEventDto).subscribe(response =>{
    
  })
 }

 public updateEvent(){
  this.mergeDto.startDate = this.selectedInterval.start;
  this.mergeDto.endDate = this.selectedInterval.end;
  this.renovationEventDto.roomName = this.productRoomName;
  this.renovationEventDto.secondaryRoomIds = this.mergeDto.secondaryIds;
  this.renovationEventDto.startAt = this.mergeDto.startDate;
  this.renovationEventDto.endAt = this.mergeDto.endDate;   
  this.renovationService.updateEvent(this.renovationEventDto).subscribe(response =>{
    
  })
 }

 formatDate(date: Date) {
  const newDate = new Date(date)
  const month = newDate.getMonth()
  const hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()
  return `${ newDate.getFullYear()} - ${this.months[month]} - ${newDate.getDate()} ${hours}:${newDate.getMinutes()}`
}
}
