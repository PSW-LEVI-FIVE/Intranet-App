import { Component, OnInit } from '@angular/core';
import { IRoom } from '../model/room.model';

import { SearchServiceService } from '../services/search-service.service';
import { Output, EventEmitter } from '@angular/core';
import { RoomMapService } from '../services/room-map.service';
import {  Input } from '@angular/core';
import { Observable } from 'rxjs';
import {FlexLayoutModule} from '@angular/flex-layout'
enum RoomTypes {
  NO_TYPE,
  OPERATION_ROOM,
  EXAMINATION_ROOM,
  HOSPITAL_ROOM ,
  CAFETERIA
}
@Component({
  selector: 'app-search-rooms',
  templateUrl: './search-rooms.component.html',
  styleUrls: ['./search-rooms.component.css']
})
export class SearchRoomsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>()
  @Output() emit = new EventEmitter<string>()
  @Input() floorID :any
  availableRoomTypes =[RoomTypes.HOSPITAL_ROOM,RoomTypes.EXAMINATION_ROOM,RoomTypes.OPERATION_ROOM,RoomTypes.CAFETERIA]
  searchRoomDTO={
    roomName:'',
    roomType:RoomTypes.NO_TYPE,
    
  }
  getOptionLabel(option: RoomTypes) {
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
  option:any
  public rooms:any=[]
 
  constructor(private searchService:SearchServiceService,private  roomService:RoomMapService) { }

  ngOnInit(): void {}
  highlightRoom(room:any){
    this.newItemEvent.emit(room)

  }
  openSearchForEquipment(roomId:any){
    this.emit.emit(roomId);
  }
  changedRoomType(d:any){
    this.searchService.searchRooms(this.floorID,this.searchRoomDTO).subscribe( res =>{
    this.rooms= res
    console.log(res+"hahaha")

      
    })
  }

  searchRoomsText(){
    this.searchService.searchRooms(this.floorID,this.searchRoomDTO).subscribe( res =>{
    this.rooms= res
      })
    }
}
