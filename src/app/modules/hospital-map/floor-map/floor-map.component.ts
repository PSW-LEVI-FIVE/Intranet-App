import { Router } from '@angular/router';
import { BuildingMapService } from './../services/building-map.service';
import { FloorMapService } from './../services/floor-map.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

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
<<<<<<< HEAD
  constructor(private floorMapService: FloorMapService, private buildingMapService:BuildingMapService, private router:Router) { }
=======
  containerForInfo:any
  ev:any
  clickInfo:any
<<<<<<< HEAD
  constructor(private floorMapService: FloorMapService, private buildingMapService:BuildingMapService) { }
>>>>>>> d30493f (Add form with information about floors in hospital)

=======
  formVisible: any="hidden";
  selectedFloor: any;
  constructor(private floorMapService: FloorMapService, private buildingMapService:BuildingMapService, private router:Router) { }
>>>>>>> cb9c77c (Made changes to design of floor map)
  ngOnInit(): void {
    this.data = this.floorMapService.getData();
    this.svg  = this.floorMapService.createSVG();
    this.floors = this.floorMapService.createRectangles(this.svg,this.data)
    this.floorsText = this.buildingMapService.addTextToRectangles(this.svg, this.data)
    //this.containerForInfo = this.floorMapService.createRectangleForAdditionalInformation(this.svg,this.data)
    //this.clickInfo = this.floorMapService.onClickShowName(this.svg,this.data)
    this.addOnClick(this.floors)
    this.markFloor(this.floors)
    this.showRooms(this.floors, this.router)
  }

  addOnClick(svg:any){
    svg.on("click", (d:any, i:any) =>{
      this.formVisible = "visible";
      this.selectedFloor = i;
    })
  }
  showRooms(svg:any, router:any){
    svg.on("dblclick", function(d:any, i:any){
      //router.navigate(['floor-map']);
      router.navigate(['room-map'], i.id)
    })
  }
  markFloor(svg:any){
    svg.on('mouseover', function(this:any,d:any,i:any,) { 
      d3.selectAll("rect").style("fill",'#d7d5db');
      d3.select(this).style("fill","#9e91bd")})
  }


}
