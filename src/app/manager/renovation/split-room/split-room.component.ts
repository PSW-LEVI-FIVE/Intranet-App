import { Component, OnInit } from '@angular/core';
import { Room } from '../../room/model/room.model';
import { RoomService } from '../../room/services/room.service';
import { TimeInterval, TimeSlotRegDTO } from '../shared/model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RenovationService } from '../services/renovation.service';
import { SplitDTO } from '../shared/split.model';
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
  selector: 'app-split-room',
  templateUrl: './split-room.component.html',
  styleUrls: ['./split-room.component.css']
})
export class SplitRoomComponent implements OnInit {

  availableRoomTypes =[RoomTypes.HOSPITAL_ROOM,RoomTypes.EXAMINATION_ROOM,RoomTypes.OPERATION_ROOM,RoomTypes.CAFETERIA]
  public isLinear = false;
  public nextStep : boolean = true;
  public finishAction: boolean = true;
  public schedule: boolean = true;
  public floorId: number = 0;
  public floorRooms: Room[] = [];
  public producedRoomType1: RoomTypes = RoomTypes.NO_TYPE;

  public intervals:TimeInterval[]=[];
  public selectedInterval:TimeInterval=new TimeInterval();
  public splitDto: SplitDTO = new SplitDTO();
  public timeSlotDto: TimeSlotRegDTO = new TimeSlotRegDTO();
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
  /*if(this.timeSlotDto.duration <= 0 || this.splitDto.mainRoomId === 0 || this.timeSlotDto.endDate === null){
     this.nextStep = true;
  }
  else this.nextStep = false;*/
  this.createEventDto.mainRoomId = this.splitDto.mainRoomId;
     this.createEventDto.type = 1;
     this.renovationService.createEvent(this.createEventDto).subscribe(resposne=>{
        this.renovationEventDto = resposne;
     })
}

 public checkThirdStepInput(){
  if(this.producedRoomType1 !== RoomTypes.NO_TYPE && this.splitDto.roomName !== '')
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
  this.timeSlotDto.roomId = this.splitDto.mainRoomId;
  this.timeSlotDto.endDate.setDate( this.timeSlotDto.endDate.getDate() + 1 );
  this.renovationService.getTimeSlots(this.timeSlotDto).subscribe(response =>{
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
  this.splitDto.startDate = this.selectedInterval.start;
  this.splitDto.endDate = this.selectedInterval.end;
  this.renovationEventDto.roomName = this.splitDto.roomName;
  this.renovationEventDto.secondaryRoomId = this.splitDto.mainRoomId;//?????
  this.renovationEventDto.startAt = this.splitDto.startDate;
  this.renovationEventDto.endAt = this.splitDto.endDate;   
  this.renovationService.updateEvent(this.renovationEventDto).subscribe(response =>{
    this.router.navigate([`manager/room-map/${this.floorId}`]);
    
  })
 }

formatDate(date: Date) {
  const newDate = new Date(date)
  const month = newDate.getMonth()
  const hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()
  return `${ newDate.getFullYear()} - ${this.months[month]} - ${newDate.getDate()} ${hours}:${newDate.getMinutes()}`
}

}
