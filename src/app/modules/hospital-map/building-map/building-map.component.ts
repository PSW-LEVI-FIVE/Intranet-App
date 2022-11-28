import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BuildingMapService } from '../services/building-map.service';
import { IBuilding } from '../model/building.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-building-map',
  templateUrl: './building-map.component.html',
  styleUrls: ['./building-map.component.css'],
  providers: [BuildingMapService]
})
export class BuildingMapComponent implements OnInit {

  public dataSource = new MatTableDataSource<IBuilding>();
  public buildings: IBuilding[] = [];
  data:any;
  svg:any;
  buildingsMap:any;
  buildingsText:any;
  label:any
  selectedBuilding:any;
  public selectedBuildingId:any;
  formVisible: any = "hidden";
  constructor(private buildingMapService: BuildingMapService, private router:Router) { }


  ngOnInit(): void {
    this.buildingMapService.getBuildings().subscribe(res => {
      this.buildings = res;
      this.dataSource.data = this.buildings;

      this.svg  = this.buildingMapService.createSVG();

      this.buildingsMap = this.buildingMapService.createRectangles(this.svg, this.buildings);
      this.buildingsText = this.buildingMapService.addTextToRectangles(this.svg, this.buildings);
      this.addOnClick(this.buildingsMap);
      this.showFloors(this.buildingsMap, this.router);
    })
   // this.data = this.buildingMapService.getData();
    

  }

  addOnClick(svg:any){
    svg.on("click", (d:any, i:any) =>{
      this.formVisible = "visible";
      
      this.selectedBuilding = i;
      
    })
  }
  showFloors(svg:any, router:any){
    svg.on("dblclick", function(d:any, i:any){
      //router.navigate(['floor-map']);
      router.navigate(['floor-map'], i.id)
    })
  }
  public updateBuilding(): void {
    if (!this.isValidInput()) return;
    this.buildingMapService.updateBuilding(this.selectedBuilding);
  }

  private isValidInput(): boolean {
    return this.selectedBuilding?.number != '' && this.selectedBuilding?.floors.toString() != '';
  }
}


