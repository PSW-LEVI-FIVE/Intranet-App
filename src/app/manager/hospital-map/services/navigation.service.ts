import { Injectable } from '@angular/core';
import { B } from 'chart.js/dist/chunks/helpers.core';
import { IFloor } from '../model/floor.model';
import { IterationBlock } from '../model/navigation.model';
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

  private iterationBlockSize = 10;
  private mapHeight = 500;
  private mapWidth = 800;
  private alreadyChecked: IterationBlock[] = [];
  private winningBlock: IterationBlock | undefined;

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

  public getRoomsByBuilding(): IRoom[] {
    return this.buildingRooms;
  }

  public navigateSetup(destinationRoom: IRoom): void {
    this.source = 'entrance';
    this.destination = destinationRoom;
    this.markedFloor = this.buildingScope.find(entry => {
      return entry.room.id === destinationRoom.id;
    })?.floor;
  }

  public visualizeNavigation(svg: any): void {
    if(!this.destination || !this.source) return;
    const startBlock = <IterationBlock> {
      x: 0,
      y: 10,
      width: this.iterationBlockSize,
      height: this.iterationBlockSize
    }

    this.navigate(startBlock, svg);
  }

  private navigate(block: IterationBlock, svg: any): IterationBlock | undefined {
    this.alreadyChecked.push(block);

    if(this.destination && this.checkBlockInRoom(block, this.destination) && this.checkDestinationEntrance(block) && !this.winningBlock){
      this.winningBlock = block;
      return block;
    }

    const moveHorizontally = this.moveHorizontally(block);
    const moveVertically = this.moveVertically(block);

    const horizontalFound = this.checkMove(moveHorizontally) ? undefined : this.navigate(moveHorizontally, svg);
    const verticalFound = this.checkMove(moveVertically) ? undefined : this.navigate(moveVertically, svg);   

    if(horizontalFound || verticalFound) {
      this.renderBlock(block, svg);
      return block;
    }

    return undefined;
  }

  private checkDestinationEntrance(block: IterationBlock): boolean {
    return this.destination ? (this.destination.xCoordinate + this.destination.width/2 >= block.x && this.destination.xCoordinate + this.destination.width/2 >= block.x + block.width): false
  }

  private checkMove(block: IterationBlock): {} | undefined {
    return this.checkMapBounds(block) || this.canMove(block) || this.checkBlockFit(block);
  }

  private canMove(block: IterationBlock): IterationBlock | undefined {
    return this.alreadyChecked.find(element => element.x === block.x && element.y === block.y);
  }

  private checkMapBounds(block: IterationBlock): boolean {
    return block.y + block.height >= this.mapHeight || block.x + block.width >= this.mapWidth
  }

  private checkBlockFit(block: IterationBlock): {} | undefined {
    return this.buildingScope.find(room => {
      return (
        this.checkFloor(room.floor) && 
        this.checkNotDestination(room.room) && 
        this.checkBlockInRoom(block, room.room)
      );
    })
  }

  private checkFloor(floor: IFloor): boolean {
    return floor.id === this.markedFloor?.id;
  }

  private checkNotDestination(room: IRoom): boolean {
    return room.xCoordinate !== this.destination?.xCoordinate || room.yCoordinate !== this.destination?.yCoordinate;
  }

  private checkBlockInRoom(block: IterationBlock, room: IRoom): boolean {
    return (block.x >= room.xCoordinate && block.x  <= room.xCoordinate + room.width) &&
          (block.y >= room.yCoordinate && block.y <= room.yCoordinate + room.height)
  }

  private moveHorizontally(block: IterationBlock): IterationBlock {
    return <IterationBlock> {
      x: block.x + this.iterationBlockSize,
      y: block.y,
      height: block.height,
      width: block.width
    }
  }

  private moveVertically(block: IterationBlock): IterationBlock {
    return <IterationBlock> {
      x: block.x,
      y: block.y + this.iterationBlockSize,
      height: block.height,
      width: block.width
    }
  }

  private renderBlock(block: IterationBlock, svg: any) {
    svg.append('rect')
    .attr('x', block.x)
    .attr('y', block.y)
    .attr('width', block.width)
    .attr('height', block.height)
    .attr('stroke', 'black')
    .attr('fill', '#d7ee00');
  }

  public resetNavigation(): void {
    this.source = undefined;
    this.destination = undefined;
    this.markedFloor = undefined;
    this.alreadyChecked = [];
    this.winningBlock = undefined;
  }

  public getDestination(): IRoom | undefined {
    return this.destination;
  }

  public getDestinationFloor(): IFloor | undefined {
    return this.markedFloor;
  }

}
