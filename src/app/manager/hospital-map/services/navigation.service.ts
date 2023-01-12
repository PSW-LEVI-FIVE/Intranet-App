import { Injectable } from '@angular/core';
import { flatRollup, svg } from 'd3';
import { B, p } from 'chart.js/dist/chunks/helpers.core';
import { index } from 'd3';
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
  public textPath: IterationBlock[] = [];

  private source: IRoom | undefined;
  private destination: IRoom | undefined;
  private markedFloor: IFloor | undefined;
  private navigationTips: string[] = [];
  private foundRoomsId: string[] = [];

  private destinations: {room: IRoom; floor: IFloor}[] = [];

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

  public navigateSetup(sourceRoom?: IRoom ,destinationRoom?: IRoom): void {
    if(!destinationRoom) return;
    
    this.source = sourceRoom;
    this.destination = destinationRoom;

    const sourceFloor = this.findRoomFloor(sourceRoom);
    const destinationFloor = this.findRoomFloor(destinationRoom);

    if(this.source && sourceFloor && destinationFloor && sourceFloor.floor.id !== destinationFloor.floor.id) {
      this.destinations = [sourceFloor, destinationFloor];
      this.source = undefined;
    }


    this.markedFloor = destinationFloor?.floor;
    

  }

  private findRoomFloor(room?: IRoom) {
    return this.buildingScope.find(entry => {
      return entry.room.id === room?.id;
    })
  }

  private matchRoomToFloor(floorId: string) {
    return this.destinations.find(entry => {
      return Number(entry.floor.id) === Number(floorId);
    })?.room
  }

  public visualizeNavigation(svg: any, floorId: string): void {
    if(this.destinations.length > 0) {
      this.destination = this.matchRoomToFloor(floorId);  
    }
      
    if(this.doNotNavigate(floorId)) return;

    const startBlock = this.makeStartBlock();
    
    if(!this.navigate(startBlock, svg, 1))
      this.navigate(startBlock, svg,-1);

    this.winningBlock = undefined;
    this.alreadyChecked = [];
  }

  private doNotNavigate(floorId: string): boolean {
    return !this.destination || Number(this.findRoomFloor(this.destination)?.floor.id) !== Number(floorId);
  }

  private makeStartBlock(): IterationBlock { 
    return <IterationBlock> {
      x: !this.source ? 0 : this.source.xCoordinate + this.source.width/2, 
      y: !this.source ? 10 : this.source.yCoordinate - 10, 
      width: this.iterationBlockSize,
      height: this.iterationBlockSize  
    }
  }

  private navigate(block: IterationBlock, svg: any, direction: number): IterationBlock | undefined {
    this.alreadyChecked.push(block);

    if(this.destination && this.checkBlockInRoom(block, this.destination) && this.checkDestinationEntrance(block) && !this.winningBlock){
      this.winningBlock = block;
      return block;
    }

    const moveHorizontally = this.moveHorizontally(block, direction);
    const moveDown = this.moveVertically(block, 1);
    const moveUp = this.moveVertically(block, -1);

    const horizontallyFound = this.checkMove(moveHorizontally) ? undefined : this.navigate(moveHorizontally, svg, direction);
    const downFound = this.checkMove(moveDown) ? undefined : this.navigate(moveDown, svg, direction);   
    const upFound = this.checkMove(moveUp) ? undefined : this.navigate(moveUp, svg, direction);
    
    if(horizontallyFound || downFound || upFound)
      return this.renderBlock(block, svg);

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
    return block.y + block.height >= this.mapHeight || block.x + block.width >= this.mapWidth || block.x < 0 || block.y < 0;
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

  private moveHorizontally(block: IterationBlock, direction: number): IterationBlock {
    return <IterationBlock> {
      x: block.x + this.iterationBlockSize * direction,
      y: block.y,
      height: block.height,
      width: block.width
    }
  }

  private moveVertically(block: IterationBlock, direction: number): IterationBlock {
    return <IterationBlock> {
      x: block.x,
      y: block.y + this.iterationBlockSize * direction,
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
    return block;
    this.textPath.push(block);

  }

  public resetNavigation(): void {
    this.source = undefined;
    this.destination = undefined;
    this.markedFloor = undefined;
    this.alreadyChecked = [];
    this.winningBlock = undefined;
    this.destinations = [];
  }

  public getDestination(): IRoom | undefined {
    return this.destination;
  }

  public getDestinationFloor(): IFloor | undefined {
    return this.markedFloor;
  }



}
