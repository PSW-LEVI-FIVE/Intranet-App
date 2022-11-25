import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators,FormGroup, FormControl} from '@angular/forms';
import { Room } from '../room/model/room.model';
import { RoomService } from 'src/app/manager/room/services/room.service';
import { JsonPipe } from '@angular/common';

export class TimeInterval {
  start: Date = new Date;
  end: Date = new Date;
}

export class EquipmentForRoom{
  id:number=0; 
  quantity:number=0;
  name:String="";
  roomId:number=0;
  room:undefined;
}

export class IntervalDto {
  startingRoomId: number = 0;
  destinationRoomId: number = 0;
  date: Date | undefined;
  duration:number = 0;
}

export class ICreateAppointment {
  equipmentId: number=0;
  startingRoomId: number =0;
  destinationRoomId: number =0;
  startDate: Date=new Date;
  endDate: Date=new Date;
  amount:number=0;
}

@Component({
  selector: 'app-room-allocation-form',
  templateUrl: './room-allocation-form.component.html',
  styleUrls: ['./room-allocation-form.component.css']
})
export class RoomAllocationFormComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,    
    private readonly roomService: RoomService,
    ) 
    {
    
  }
  /*range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });*/
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
  public startingRooms: Room[] = [];
  public selectedStartingRoomId = 0;
  public destinationRooms: Room[] = [];
  public selectedDestinationRoomId= 0;
  public pick: Date = new Date()
  public dur = 0;
  public dto:IntervalDto={
    startingRoomId: 0,
    destinationRoomId: 0,
    date: new Date(),
    duration:0    
  };
  public CreateDto:ICreateAppointment=new ICreateAppointment;


  public intervals:TimeInterval[]=[];
  public selectedInterval:TimeInterval=new TimeInterval;

  public equipments:EquipmentForRoom[]=[];
  public selectedEquipment:EquipmentForRoom=new EquipmentForRoom;

  public amount:number=0;

  public new:ICreateAppointment=new ICreateAppointment;
  
  ngOnInit(): void {
     this.roomService.getRooms().subscribe(res => {
       this.startingRooms = res;
       this.destinationRooms=res;
     })
  }
  stringify(interval:TimeInterval):String {
    return JSON.stringify(interval);
  }
  stringify1(eq:EquipmentForRoom):String {
    return JSON.stringify(eq) ;
  }
  fill(): Room[]{
    return this.startingRooms;
  }

  find_available()
  {
    this.dto.startingRoomId=this.selectedStartingRoomId;
    this.dto.destinationRoomId=this.selectedDestinationRoomId;
    this.dto.duration = this.dur;
    this.dto.date=this.pick;
    this.dto.date.setDate( this.pick.getDate() + 1 );

    this.roomService.getInterval(this.dto).subscribe(res => {
      this.intervals=res;
    })
    this.roomService.getEquipment1(this.dto.startingRoomId).subscribe(res => {
      this.equipments=res;
    })
  }

  create_new(){
    this.CreateDto.startingRoomId=this.selectedStartingRoomId;
    this.CreateDto.destinationRoomId=this.selectedDestinationRoomId;
    this.CreateDto.equipmentId=this.selectedEquipment.id;
    this.CreateDto.startDate=this.selectedInterval.start;
    this.CreateDto.endDate=this.selectedInterval.end;
    this.CreateDto.amount=this.amount;

    this.roomService.createReallocation(this.CreateDto).subscribe(res => {
      this.new=res;
    })
  }

}
