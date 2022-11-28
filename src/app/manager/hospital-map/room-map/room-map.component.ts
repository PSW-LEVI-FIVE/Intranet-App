import { Router, ActivatedRoute, Params } from '@angular/router';
import { BuildingMapService } from './../services/building-map.service';
import { RoomMapService } from './../services/room-map.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ToastrService } from 'ngx-toastr';
import { CreateRoom, IRoom } from '../model/room.model';
import { create } from 'd3';

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
  floorId :any 
  selected:any
  enableEditing : boolean = false;
  selectedObjects:any;

  constructor(
    private roomMapService:RoomMapService, 
    private buildingMapService:BuildingMapService, 
    private route: ActivatedRoute, 
    private router:Router, 
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.floorId = params['id'];
      console.log(this.floorId)
    });
    
    this.svg  = this.buildingMapService.createSVG();
    
    this.route.params.subscribe((params: Params) => {
      this.roomMapService.getRoomsByBuilding(params['id']).subscribe(res => {
        this.data = res;
        console.log(this.data)
        this.svg  = this.buildingMapService.createSVG();
        this.rooms = this.roomMapService.createRectangles(this.svg,this.data)
        this.roomsText = this.buildingMapService.addTextToRectangles(this.svg, this.data)

        this.showInformation(this.rooms);
        this.markRoom(this.rooms);

      })
    });
    

  }

  public toggleCreate(): void {
    const createRoom = this.roomMapService.handleRoomGeneration(this.data);
    if(createRoom) {
      this.route.params.subscribe((params: Params) => createRoom.mapFloorId = params['id']);
      this.router.navigate(['manager/create-room'], {state: {data: createRoom}});
    } else {
      this.toastService.info('Maximum number of rooms reached');
    }
  }

  showInformation(svg:any){
    svg.on('dblclick',(d:any, i:any) => {
    
      
      this.roomMapService.getByID(i.id).subscribe(res => {
        this.selectedObjects=res;  
        this.enableEditing = false;
      })

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
  this.roomMapService.updateRoom(this.selectedObjects);
}

private isValidInput(): boolean {
  return this.selectedObjects?.roomNumber != '';
}

 highlight(id:any){
  d3.selectAll("rect").style("fill",'white')
  
  d3.select("#id"+id).style("fill",'#d7d5db')
  
  

}
 click(svg:any){
 
  }
}


