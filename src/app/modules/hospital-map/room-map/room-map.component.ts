import { BuildingMapService } from './../services/building-map.service';
import { RoomMapService } from './../services/room-map.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private roomMapService:RoomMapService, private buildingMapService:BuildingMapService) { }

  ngOnInit(): void {
    this.data = this.roomMapService.getData();
    this.svg  = this.buildingMapService.createSVG();
    this.rooms = this.buildingMapService.createRectangles(this.svg, this.data)
    this.roomsText = this.buildingMapService.addTextToRectangles(this.svg, this.data)

  }

}
