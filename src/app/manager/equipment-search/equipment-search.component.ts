import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipment } from '../equipment/model/equipment.model';
import { EquipmentService } from '../equipment/services/equipment.service';
import { BuildingMapService } from '../hospital-map/services/building-map.service';
import { RoomMapService } from '../hospital-map/services/room-map.service';
import { Room } from '../room/model/room.model';
import { RoomService } from '../room/services/room.service';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.css']
})
export class EquipmentSearchComponent implements OnInit {

  constructor(private roomMapService:RoomMapService, 
    private buildingMapService:BuildingMapService, 
    private route: ActivatedRoute, 
    private router:Router, 
    private toastService: ToastrService,
    private equipmentService: EquipmentService,
    private roomService: RoomService) { }
    displayedColumns: string[] = ['name','quantity'];
    dataSource:Equipment[]=[]
    floorId:any
    roomId:any
    selectedObjects:any
    roomIdProba:number =4
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
  }
  public searchEquipmentInRoom(){
    if(this.searchEquipmentInput.name == undefined || this.searchEquipmentInput.name == "") this.searchEquipmentInput.name = "0";

     this.equipmentService.searchEquipmentInRoom(this.searchEquipmentInput).subscribe(res =>{
      this.dataSource = res;
      if(this.searchEquipmentInput.name == "0") this.searchEquipmentInput.name = "";
     })
  }
}
