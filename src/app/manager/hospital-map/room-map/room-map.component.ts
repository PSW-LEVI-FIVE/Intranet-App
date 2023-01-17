import { Router, ActivatedRoute, Params } from '@angular/router';
import { BuildingMapService } from './../services/building-map.service';
import { RoomMapService } from './../services/room-map.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ToastrService } from 'ngx-toastr';
import { CreateRoom, IRoom, IRoomModel, RoomArea } from '../model/room.model';
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


  private data: IRoom[] = [];
  private svg: any;
  private rooms: any;
  private complexRooms: any;
  roomsText: any;
  floorId: any;
  selected: any;
  enableEditing: boolean = false;
  public selectedRoomModel: IRoomModel | undefined;
  selectedObjects: any;
  roomObject: any
  searchedEquipment: Equipment[] = [];
  searchedRooms: Room[] = [];
  searchEquipmentInput: Equipment = {} as Equipment;
  searchFloorInput: Equipment = {} as Equipment;
  roomsOnFloor: Room[] = [];

  textNavigation: string[] = [];
  navigation: boolean = true;

  private select = false;
  private selectSplit = false;
  private selectedSplitRoom: number | undefined;
  private selectedRooms: IRoom[] = [];

  constructor(
    private roomMapService: RoomMapService,
    private buildingMapService: BuildingMapService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
    private equipmentService: EquipmentService,
    private roomService: RoomService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.floorId = params['id'];
      this.searchFloorInput.roomId = params['id']
      this.checkNumberOfRooms()
    });


    this.route.params.subscribe((params: Params) => {
      this.roomMapService.getRoomsByFloor(params['id']).subscribe(res => {
        this.data = res;

        this.svg = this.buildingMapService.createSVG();

        this.rooms = this.roomMapService.createRectangles(
          this.svg,
          this.data.filter(room => !room.secondaryCoordinates)
        );

        this.complexRooms = this.roomMapService.createComplexRoom(
          this.svg,
          this.data.filter(room => room.secondaryCoordinates)
        );
        this.roomsText = this.buildingMapService.addTextToRectangles(this.svg, this.data)   
        this.showInformationBasic(this.rooms);
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
    if (createRoom) {
      this.route.params.subscribe((params: Params) => createRoom.mapFloorId = params['id']);
      this.router.navigate(['manager/create-room'], { state: { data: createRoom } });
    } else {
      this.toastService.info('Maximum number of rooms reached');
    }
  }

  private showDestinationRoom(): void {
    const room = this.navigationService.getDestination();
    if (room) d3.select('#id' + room.id).style('fill', '#d7ee00');
  }

  private visualizeNavigation(floorId: string): void {
    this.navigationService.visualizeNavigation(this.svg, floorId);
    this.textNavigation = this.navigationService.getDirections();
    if(this.textNavigation.length !== 0) this.navigation = false;
  }
  private showInformationBasic(svg: any) {
    svg.on('dblclick', (d: any, i: any) => {
      this.router.navigate(['manager/room-info/' + this.floorId + '/' + i.id]);
    });
  }


  private showInformationComplex(svgs: any, component: any) {
    svgs.forEach((svg: any) => {
      svg.on('dblclick', function(this: any) {
        const room = <RoomArea>d3.select(this).datum();
        component.router.navigate(['manager/room-info/' + this.floorId + '/' + room.roomId]);
      });
    });
  }

  private showInformation(roomId: number) {
    this.roomMapService.getByID(roomId).subscribe(res => {
      this.selectedRoomModel = res;
      this.enableEditing = false;
    })

    this.roomService.getRoomEquipment(roomId).subscribe(res => {
      this.searchedEquipment = res;
      this.searchEquipmentInput.roomId = roomId;
      this.searchEquipmentInput.quantity = 0;
    })
  }
  public highlight(id: any) {
    d3.selectAll('rect').style('fill', 'white');
    d3.select("#id" + id).style('fill', '#d7d5db');
  }
  public updateRoom(): void {
    if (this.selectedRoomModel) {
      this.roomMapService.updateRoom(this.selectedRoomModel).subscribe(() => {
        this.toastService.success('Successfully updated room name');
      });
    }
  }
  openRoomEquipmentSearch(id: any) {
    this.roomMapService.getByID(id).subscribe(res => {
      this.roomObject = res;

    })

  }
  roomSchedule(roomId: number) {
    this.router.navigate(['manager/room-schedule/' + roomId]);

  }

  private markRoom(svg: any) {
    svg.on('click', function (this: any, d: any, i: any,) {
      d3.selectAll("rect").style("fill", '#FFFFFF');
      d3.selectAll('path').style("fill", '#FFFFFF');
      d3.select(this).style("fill", "#9e91bd");
    })
  }

  public searchEquipmentInRoom() {
    if (this.searchEquipmentInput.name == undefined || this.searchEquipmentInput.name == "") this.searchEquipmentInput.name = "0";

    this.equipmentService.searchEquipmentInRoom(this.searchEquipmentInput).subscribe(res => {
      this.searchedEquipment = res;
      if (this.searchEquipmentInput.name == "0") this.searchEquipmentInput.name = "";
    })
  }

  public searchRoomsByFloorContainigEquipment() {
    if (this.searchFloorInput.name == undefined || this.searchFloorInput.name == "") this.searchFloorInput.name = "0";
    this.equipmentService.searchRoomsByFloorContainigEquipment(this.searchFloorInput).subscribe(res => {
      this.searchedRooms = res;
      if (this.searchFloorInput.name == "0") this.searchFloorInput.name = "";
    })
  }

  public checkNumberOfRooms() {
    this.roomService.getRoomsbyFloor(this.floorId).subscribe(res => {
      this.roomsOnFloor = res;
    })
  }

  public toggleMerge(): void {

    if (!this.select) {
      this.select = true;
      this.toastService.info('Please select rooms for merging');
      this.toggleMergeSelect(this.rooms);
      return;
    }

    if (this.selectedRooms.length < 2) {
      this.toastService.error('Please select at least two rooms to merge');
      return;
    }

    this.router.navigate(['manager/merge-rooms/' + this.floorId], { state: { data: this.selectedRooms } });
  }

  public toggleSplit(): void {
    if(!this.selectSplit) {
      this.selectSplit = true;
      this.toastService.info('Please select a room to split');
      this.toggleSplitSelect(this.complexRooms, this);
      return;
    }

    if(!this.selectedSplitRoom) {
      this.toastService.error('You must select a room');
      return;
    }

    this.router.navigate(['manager/split-room/' + this.floorId], { state: { data: this.selectedSplitRoom } });
  }

  private toggleSplitSelect(svgs: any, component: RoomMapComponent) {
    svgs.forEach((svg: any) => {
      svg.on('click', function(this: any) {
        const roomArea = <RoomArea>d3.select(this).datum();
        component.selectedSplitRoom = roomArea.roomId;
        d3.selectAll('path').style('fill', '#FFFFFF');
        d3.select(this).style('fill', '#DC143C');
      });
    })
  }

  private toggleMergeSelect(svg: any) {
    svg.on('click', (d: any, i: IRoom) => {
      if (this.selectedRooms.length === 0 || !this.selectedRooms.find(room => room.id === i.id) && this.roomMapService.canSelect(this.selectedRooms, i)) {
        this.selectedRooms.push(i);
        d3.select('#id' + i.id).style('fill', '#32CD32');
      } else if (this.roomMapService.canDeselect(this.selectedRooms, i)) {
        this.selectedRooms.pop();
        d3.select('#id' + i.id).style('fill', '#FFFFFF');
      }
    });
  }
}


