import { Router } from '@angular/router';
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
  selectedBuilding:any;
  public selectedBuildingId:any;
  formVisible: any = "hidden";
  constructor(private buildingMapService: BuildingMapService, private router:Router) { }

  ngOnInit(): void {
    this.data = this.buildingMapService.getData();
    this.svg  = this.buildingMapService.createSVG();
    this.buildings = this.buildingMapService.createRectangles(this.svg, this.data);
    this.buildingsText = this.buildingMapService.addTextToRectangles(this.svg, this.data);
    this.addOnClick(this.buildings);
    this.showFloors(this.buildings, this.router);
  }

  addOnClick(svg:any){
    svg.on("click", (d:any, i:any) =>{
      this.formVisible = "visible";
      this.selectedBuilding = i;
    })
  }
  showFloors(svg:any, router:any){
    svg.on("dblclick", function(d:any, i:any){
      //alert(i.id);
      router.navigate(['floor-map']);
      //router.navigate(['floor-map'], i.id)
    })
  }
}


