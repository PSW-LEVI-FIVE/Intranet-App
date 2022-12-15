import { Router, ActivatedRoute, Params } from '@angular/router';
import { BuildingMapService } from './../services/building-map.service';
import { RoomMapService } from './../services/room-map.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ToastrService } from 'ngx-toastr';
import { CreateRoom, IRoom, IRoomModel } from '../model/room.model';
import { create } from 'd3';
import { Equipment } from '../../equipment/model/equipment.model';
import { Room } from '../../room/model/room.model';
import { EquipmentService } from '../../equipment/services/equipment.service';
import { RoomService } from '../../room/services/room.service';
import { NavigationService } from '../services/navigation.service';

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
  public selectedRoomModel: IRoomModel | undefined;
  selectedObjects:any;
  roomObject:any
  searchedEquipment: Equipment[] = [];
  searchedRooms: Room[] = [];
  searchEquipmentInput: Equipment = {} as Equipment;
  searchFloorInput: Equipment = {} as Equipment;
  textNavigation: string[] = [];
  navigation: boolean = true;
  
  constructor(
    private roomMapService:RoomMapService, 
    private buildingMapService:BuildingMapService, 
    private route: ActivatedRoute, 
    private router:Router, 
    private toastService: ToastrService,
    private equipmentService: EquipmentService,
    private roomService: RoomService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.floorId = params['id'];
      this.searchFloorInput.roomId = params['id']
    });
    
    this.svg  = this.buildingMapService.createSVG();
    
    this.route.params.subscribe((params: Params) => {
      this.roomMapService.getRoomsByFloor(params['id']).subscribe(res => {
        this.data = res;
        console.log(this.data)
        this.svg  = this.buildingMapService.createSVG();
        this.rooms = this.roomMapService.createRectangles(this.svg,this.data)
        this.roomsText = this.buildingMapService.addTextToRectangles(this.svg, this.data)

        this.showInformation(this.rooms);
        this.markRoom(this.rooms);
        
        this.textNavigation = [];
        this.showDestinationRoom();
        this.visualizeNavigation(params['id']);
      })
    });

    this.searchFloorInput.quantity = 0;
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

  private showDestinationRoom(): void {
    const room = this.navigationService.getDestination();
    if(room) d3.select('#id'+ room.id).style("fill",'#d7ee00');
  }

<<<<<<< HEAD
  private visualizeNavigation(floorId: string): void {
    this.navigationService.visualizeNavigation(this.svg, floorId);
=======
  private visualizeNavigation(): void {
    this.navigationService.visualizeNavigation(this.svg);
    this.textNavigation = this.navigationService.getDirections();
    if(this.textNavigation.length > 0){
      this.navigation = false;
    }
>>>>>>> 2883640 (add text navigation)
  }

  showInformation(svg:any){
    svg.on('dblclick',(d:any, i:any) => {
      this.roomMapService.getByID(i.id).subscribe(res => {
        this.selectedRoomModel = res;  

      var ids = this.floorId + '-'+ i.id
      this.router.navigate(['manager/room-info/'+this.floorId+'/'+i.id]);


    })
  })
}

markRoom(svg:any){
  svg.on('click', function(this:any,d:any,i:any,) { 
    d3.selectAll("rect").style("fill",'#d7d5db');
    d3.select(this).style("fill","#9e91bd");
})
}

public editForm(){
  if(this.selectedRoomModel) this.enableEditing = true;
}

public updateRoom(): void {
  if(this.selectedRoomModel){
    this.roomMapService.updateRoom(this.selectedRoomModel).subscribe(() => {
      this.toastService.success('Successfully updated room name');
    });
  }
}


 highlight(id:any){
  d3.selectAll("rect").style("fill",'white') 
  d3.select("#id"+id).style("fill",'#d7d5db')

}

openRoomEquipmentSearch(id:any){
  this.roomMapService.getByID(id).subscribe(res => {
    this.roomObject=res;  
   
  })
}
roomSchedule(roomId:number){
  this.router.navigate(['manager/room-schedule/'+roomId]);
}

  public searchEquipmentInRoom(){
    if(this.searchEquipmentInput.name == undefined || this.searchEquipmentInput.name == "") this.searchEquipmentInput.name = "0";

     this.equipmentService.searchEquipmentInRoom(this.searchEquipmentInput).subscribe(res =>{
      this.searchedEquipment = res;
      if(this.searchEquipmentInput.name == "0") this.searchEquipmentInput.name = "";
     })
  }

  public searchRoomsByFloorContainigEquipment(){
    if(this.searchFloorInput.name == undefined || this.searchFloorInput.name == "") this.searchFloorInput.name = "0";
    this.equipmentService.searchRoomsByFloorContainigEquipment(this.searchFloorInput).subscribe(res =>{
       this.searchedRooms = res;
       if(this.searchFloorInput.name == "0") this.searchFloorInput.name = "";
    }) 
  }
}


