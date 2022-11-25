import { Component, OnInit } from '@angular/core';
import { IRoom } from '../model/room.model';

import { SearchServiceService } from '../services/search-service.service';
import { Output, EventEmitter } from '@angular/core';
import { RoomMapService } from '../services/room-map.service';
import {  Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-rooms',
  templateUrl: './search-rooms.component.html',
  styleUrls: ['./search-rooms.component.css']
})
export class SearchRoomsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>()
  @Input() floorID :any

  searchRoomDTO={
    roomName:'',
    roomType:"NO_TYPE",
    
  }
  option:any
  public rooms:any=[]
 
  constructor(private searchService:SearchServiceService,private  roomService:RoomMapService) { }

  ngOnInit(): void {

    //this.searchService.searchRooms(searchRoomDTO)
    

  
}
 

  highlightRoom(room:any){
    console.log(room +"hahhha")
    this.newItemEvent.emit(room)

  }
  changedRoomType(d:any){
    console.log(this.searchRoomDTO.roomType+"ffffffff")
    
    //this.rooms = this.searchService.searchRooms(this.floorID,this.searchRoomDTO)
     
    this.searchService.searchRooms(this.floorID,this.searchRoomDTO).subscribe( res =>{
      console.log(res)
      this.rooms= res
      
    })
  }

    searchRoomsText(){
      this.searchService.searchRooms(this.floorID,this.searchRoomDTO).subscribe( res =>{
        console.log(res)
        this.rooms= res
      })
    }
    
    
    
  
  

}
