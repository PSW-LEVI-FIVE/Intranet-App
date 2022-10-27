import { Component, OnInit } from '@angular/core';
import { BuildingMapService } from '../services/building-map.service';

@Component({
  selector: 'app-building-map',
  templateUrl: './building-map.component.html',
  styleUrls: ['./building-map.component.css'],
  providers: [BuildingMapService]
})
export class BuildingMapComponent implements OnInit {

  
  data:any;
  svg:any;
  buildings:any;
  buildingsText:any;
  constructor(private buildingMapService: BuildingMapService) { }

  ngOnInit(): void {
    this.data = this.buildingMapService.getData();
    this.svg  = this.buildingMapService.createSVG();
    this.buildings = this.buildingMapService.createRectangles(this.svg, this.data)
    this.buildingsText = this.buildingMapService.addTextToRectangles(this.svg, this.data)
  }

}
