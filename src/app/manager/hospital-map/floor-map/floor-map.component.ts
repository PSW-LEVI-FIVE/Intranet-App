import { ActivatedRoute, Params, Router } from '@angular/router';
import { BuildingMapService } from './../services/building-map.service';
import { FloorMapService } from './../services/floor-map.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ToastrService } from 'ngx-toastr';
import { IFloor } from '../model/floor.model';
import { NavigationService } from '../services/navigation.service';

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
  containerForInfo:any
  ev:any
  clickInfo:any
  formVisible: any="hidden";
  selectedFloor: any;

  constructor(
    private toastService: ToastrService, 
    private floorMapService: FloorMapService, 
    private buildingMapService:BuildingMapService,
    private route: ActivatedRoute, 
    private router:Router,
    private navigationService: NavigationService
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.floorMapService.getFloorsByBuilding(params['id']).subscribe(res => {
        this.data = res;
        this.svg  = this.floorMapService.createSVG();
        this.floors = this.floorMapService.createRectangles(this.svg,this.data)
        this.floorsText = this.buildingMapService.addTextToRectangles(this.svg, this.data)
        this.addOnClick(this.floors)
      this.markFloor(this.floors)
      this.showRooms(this.floors, this.router)
      this.showDestinationFloor();
      })
    });

  }

  public toggleCreate(): void {
    const createFloor = this.floorMapService.handleFloorGeneration(this.data);
    if(createFloor) {
      this.route.params.subscribe((params: Params) => createFloor.buildingId = params['id']);
      this.router.navigate(['manager/create-floor'], {state: {data: createFloor}});
    } else {
      this.toastService.info('Maximum number of floors reached');
    }
  }

  private showDestinationFloor(): void {
    const floor = this.navigationService.getDestinationFloor();
    if(floor) d3.select('#id' + floor.id).style("fill",'#d7ee00');
  }

  addOnClick(svg:any){
    svg.on("click", (d:any, i:any) =>{
      this.formVisible = "visible";
      this.selectedFloor = i;

      this.floorMapService.getFloorById(i.id).subscribe(res => {this.selectedFloor=res;})
    })

  }
  showRooms(svg:any, router:any){
    svg.on("dblclick", function(d:any, i:any){
      router.navigate(['manager/room-map/'+ i.id]);
      
    })
  }
  markFloor(svg:any){
    svg.on('mouseover', function(this:any,d:any,i:any,) { 
      d3.selectAll("rect").style("fill",'#d7d5db');
      d3.select(this).style("fill","#9e91bd")})
  }

  public updateFloor(): void {
    if (!this.isValidInput()) return;
    this.floorMapService.updateFloor(this.selectedFloor);
  }

  private isValidInput(): boolean {
    return this.selectedFloor?.name != '' && this.selectedFloor?.area.toString() != '';
  }


}
