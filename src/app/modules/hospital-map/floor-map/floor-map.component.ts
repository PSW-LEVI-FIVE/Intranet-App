import { BuildingMapService } from './../services/building-map.service';
import { FloorMapService } from './../services/floor-map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-floor-map',
  templateUrl: './floor-map.component.html',
  styleUrls: ['./floor-map.component.css'],
  providers: [FloorMapService]
})
export class FloorMapComponent implements OnInit {

  data:any;
  svg:any;
  floors:any;
  floorsText:any;
  constructor(private floorMapService: FloorMapService, private buildingMapService:BuildingMapService) { }

  ngOnInit(): void {
    this.data = this.floorMapService.getData();
    this.svg  = this.buildingMapService.createSVG();
    this.floors = this.buildingMapService.createRectangles(this.svg, this.data)
    this.floorsText = this.buildingMapService.addTextToRectangles(this.svg, this.data)
  }

}
