import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IFloor } from '../model/floor.model';
import { IRoom } from '../model/room.model';
import { FloorMapService } from './floor-map.service';
import { RoomMapService } from './room-map.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public buildingId: number = -1;
  public buildingRooms: IRoom[] = [];
  public buildingScope: {room: IRoom; floor: IFloor}[] = [];

  private source: IRoom | string | undefined;
  private destination: IRoom | undefined;
  private markedFloor: IFloor | undefined;

  constructor(
    private floorService: FloorMapService, 
    private roomService: RoomMapService
  ) {}

  public makeBuildingScope(buildingId: number): void {
    this.buildingRooms = [];
    this.buildingId = buildingId;

    this.floorService.getFloorsByBuilding(buildingId).subscribe(response => {
      response.forEach((floor: IFloor) => {
        this.roomService.getRoomsByFloor(+floor.id).subscribe(response => {
          this.buildingRooms.push(...response);
          
          response.forEach(room => {
            this.buildingScope.push(<{room: IRoom; floor: IFloor}>{
              room: room,
              floor: floor
            });
          })
        })
      });
    });
  }

  public getRoomsByBuilding(buildingId: number): IRoom[] {
    return this.buildingRooms;
  }

  public navigate(destinationRoom: IRoom): void {
    this.source = 'entrance';
    this.destination = destinationRoom;
    this.markedFloor = this.buildingScope.find(entry => {
      return entry.room.id === destinationRoom.id;
    })?.floor;
  }

  public resetNavigation():void {
    this.source = undefined;
    this.destination = undefined;
    this.markedFloor = undefined;
  }

  public getDestination(): IRoom | undefined {
    return this.destination;
  }

  public getDestinationFloor(): IFloor | undefined {
    return this.markedFloor;
  }

}
