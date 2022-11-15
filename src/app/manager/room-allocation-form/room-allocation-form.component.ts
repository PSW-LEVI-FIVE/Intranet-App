import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { Room } from '../room/model/room.model';
import { RoomService } from 'src/app/manager/room/services/room.service';


export interface ICreateAppointment {
  EquipmentId: number;
  StartingRoomId: number | null;
  DestinationRoomId: number | null;
  StartAt: Date;
  EndAt: Date;
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

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
  public startingRooms: Room[] = [
    {id: 1,
      roomNumber: "100A",
      floor: 1},
    {id: 2,
      roomNumber: "200A",
      floor: 2},
    {id: 3,
      roomNumber: "202B",
      floor: 2}
  ];
  public selectedStartingRoomId = 0;
  public destinationRooms: Room[] = [
    {id: 1,
      roomNumber: "100A",
      floor: 1},
    {id: 2,
      roomNumber: "200A",
      floor: 2},
    {id: 3,
      roomNumber: "202B",
      floor: 2}
  ];
  public selectedDestinationRoomId= 0;
  public startDate: Date = new Date()
  public endDate: Date = new Date()

  
  ngOnInit(): void {
    // this.roomService.getRooms().subscribe(res => {
    //   this.startingRooms = res;
    // })
  }
  fill(): Room[]{
    return [
      {id: 1,
        roomNumber: "100A",
        floor: 1},
      {id: 2,
        roomNumber: "200A",
        floor: 2},
      {id: 3,
        roomNumber: "202B",
        floor: 2}
    ]
  }
  drop(selectedStartingRoomId:number){
    this.destinationRooms=this.fill();
    this.destinationRooms.forEach((room,index)=>{
      if(room.id==selectedStartingRoomId) this.destinationRooms.splice(index,1);
   });
    return this.destinationRooms;
  }

  

}
