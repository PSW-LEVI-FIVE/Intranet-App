import { Router } from '@angular/router';
import { BuildingMapService } from './../services/building-map.service';
import { RoomMapService } from './../services/room-map.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-room-map',
  templateUrl: './room-map.component.html',
  styleUrls: ['./room-map.component.css'],
  providers: [RoomMapService]
})
export class RoomMapComponent implements OnInit {

  data:any;
  svg:any;
  rooms:any;
  roomsText:any;
  enableEditing : boolean = false;
  selectedObjects:any;
  constructor(private roomMapService:RoomMapService, private buildingMapService:BuildingMapService, private router:Router) { }

  ngOnInit(): void {
    this.data = this.roomMapService.getData();
    this.svg  = this.buildingMapService.createSVG();
    this.rooms = this.roomMapService.createRectangles(this.svg, this.data)
    this.roomsText = this.buildingMapService.addTextToRectangles(this.svg, this.data)

    this.showInformation(this.rooms);
    this.markRoom(this.rooms);

    /*this.route.params.subscribe((params: Params) => {
      this.roomMapService.getRooms(params['id']).subscribe(res => {
        this.data = res;
      })
    });
    */

  }

  showInformation(svg:any){
    svg.on('dblclick',(d:any, i:any) => {
      this.selectedObjects = i;
      this.enableEditing = false;
    })
}

markRoom(svg:any){
  svg.on('click', function(this:any,d:any,i:any,) { 
    d3.selectAll("rect").style("fill",'#d7d5db');
    d3.select(this).style("fill","#9e91bd")})
}

editForm(){
  if(this.selectedObjects != null){
   this.enableEditing = true;
  }
  else{
    alert('Please select select room')
  }
   
}

public updateRoom(): void {
  // if (!this.isValidInput()) return;
  // this.roomMapService.updateRoom(this.selectedRoom);
}

private isValidInput(): boolean {
  return this.selectedObjects?.name != '';
}

}
