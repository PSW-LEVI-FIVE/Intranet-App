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

  public buildingScope: number = -1;
  public buildingRooms: IRoom[] = [];
  
  private source: IRoom | string | undefined;
  private destination: IRoom | undefined;

  constructor(
    private floorService: FloorMapService, 
    private roomService: RoomMapService
  ) {}

  public getRoomsByBuilding(buildingId: number): IRoom[] {
    this.buildingRooms = [];
    this.buildingScope = buildingId;

    this.floorService.getFloorsByBuilding(buildingId).subscribe(response => {
      response.forEach((floor: IFloor) => {
        this.roomService.getRoomsByFloor(+floor.id).subscribe(response => {
          this.buildingRooms.push(...response);
        })
      });
    });
    
    return this.buildingRooms;
  }

  public navigate(destinationRoom: IRoom): void {
    this.source = 'entrance';
    this.destination = destinationRoom;
  }

  public resetNavigation():void {
    this.source = undefined;
    this.destination = undefined;
  }

}
