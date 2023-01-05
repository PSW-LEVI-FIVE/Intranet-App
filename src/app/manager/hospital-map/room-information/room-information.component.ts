import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipment } from '../../equipment/model/equipment.model';
import { EquipmentService } from '../../equipment/services/equipment.service';
import { Room } from '../../room/model/room.model';
import { RoomService } from '../../room/services/room.service';
import { BuildingMapService } from '../services/building-map.service';
import { RoomMapService } from '../services/room-map.service';
export interface IRoomEquipment{
  quantity:number,
  name:string
}
@Component({
  selector: 'app-room-information',
  templateUrl: './room-information.component.html',
  styleUrls: ['./room-information.component.css']
})
export class RoomInformationComponent implements OnInit {
  displayedColumns: string[] = ['name','quantity'];
  dataSource:Equipment[]=[]
  constructor(
    private roomMapService:RoomMapService, 
    private buildingMapService:BuildingMapService, 
    private route: ActivatedRoute, 
    private router:Router, 
    private toastService: ToastrService,
    private equipmentService: EquipmentService,
    private roomService: RoomService
  ) {}
    floorId:any
    roomId:any
    selectedObjects:any
    data:any;
    svg:any;
    rooms:any;
    roomsText:any;
    selected:any
    enableEditing : boolean = false;
    roomObject:any
    searchedEquipment: Equipment[] = [];
    searchedRooms: Room[] = [];
    searchEquipmentInput: Equipment = {} as Equipment;
    searchFloorInput: Equipment = {} as Equipment;
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.floorId = params['id'];
      this.roomId = params['fid']
    })
      this.roomMapService.getByID(this.roomId).subscribe(res => {
        this.selectedObjects=res;
    });
    this.equipmentService.getEquipmentByRoom(this.roomId).subscribe(res=>{
      this.dataSource = res
    });
  }

  roomSchedule(id:number){
    this.router.navigate(['manager/room-schedule/'+id]);
  }

  public searchEquipmentInRoom(){
    if(this.searchEquipmentInput.name == undefined || this.searchEquipmentInput.name == "") this.searchEquipmentInput.name = "0";

     this.equipmentService.searchEquipmentInRoom(this.searchEquipmentInput).subscribe(res =>{
      this.searchedEquipment = res;
      if(this.searchEquipmentInput.name == "0") this.searchEquipmentInput.name = "";
     })
  }
}
