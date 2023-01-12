import { Coordinates, CreateRoom, IRoom, IRoomModel, RoomArea } from './../model/room.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cA, S } from 'chart.js/dist/chunks/helpers.core';
import { area, Area, thresholdSturges } from 'd3';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class RoomMapService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private mapHeight = 500;
  private mapWidth = 800;

  private defaultRoomHeight = 80;
  private defaultRoomWidth = 80;
  private offset = 35;

  constructor(private http: HttpClient) { }

  public createRoom(createRoom: CreateRoom): Observable<CreateRoom> {
    return this.http.post<CreateRoom>(
      `${this.apiHost}api/intranet/map/rooms`, 
      JSON.stringify(createRoom), 
      { headers: this.headers }
    );
  }

  public handleRoomGeneration(rooms: IRoom []): CreateRoom | undefined {
    const newRoom = <CreateRoom> {
      xCoordinate: this.offset,
      yCoordinate: this.offset,
      width: this.defaultRoomHeight,
      height: this.defaultRoomWidth,
    }

    for (let room of rooms) {
      if (this.checkFit(newRoom, room)) 
        break;

      if (this.checkBorderFit(newRoom.xCoordinate, this.defaultRoomWidth, this.mapWidth)) {
        newRoom.xCoordinate += this.defaultRoomHeight + this.offset;
        continue;
      }

      newRoom.xCoordinate = this.offset;
      if (!this.checkBorderFit(newRoom.yCoordinate, this.defaultRoomHeight, this.mapHeight))
        return undefined;

      newRoom.yCoordinate += this.defaultRoomHeight + this.offset;
    }

    return newRoom;
  }

  private checkFit(newRoom: CreateRoom, room: IRoom): boolean {
    return !(this.checkCoordinate(newRoom.xCoordinate, room.xCoordinate, this.defaultRoomWidth) && 
            this.checkCoordinate(newRoom.yCoordinate, room.yCoordinate, this.defaultRoomHeight))
  }

  private checkCoordinate(newCoordinate: number, oldCoordinate: number, def: number): boolean {
    return (newCoordinate >= oldCoordinate && newCoordinate <= oldCoordinate + def)
  }

  private checkBorderFit(newCoordinate: number, def: number, map: number): boolean {
    return (newCoordinate + 2 * def + this.offset < map);
  }

  public getByID(id: number): Observable<IRoomModel> {
    return this.http.get<IRoomModel>(this.apiHost + 'api/intranet/rooms/' + id, {headers: this.headers});
  }
  public getRoomsByFloor(id: number): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(this.apiHost + 'api/intranet/map/rooms/' + id, {headers: this.headers});
  }
  public updateRoom(room: IRoomModel): Observable<IRoomModel> {
    return this.http.put<IRoomModel>(this.apiHost + 'api/intranet/rooms/' + room.id, JSON.stringify(room.roomNumber), {headers: this.headers});
  }

  public createRectangles(svg:any,data:IRoom[]){
    return svg.selectAll("rect").data(data).enter().append("rect")
    .attr("height", (d:IRoom) => d.height)
    .attr("width", (d:IRoom) => d.width)
    .attr("fill", 'white')
    .attr("stroke", "black")
    .attr("x", (d:IRoom) => d.xCoordinate)
    .attr("y", (d:IRoom) => d.yCoordinate)
    .attr('id', (d:IRoom) => "id"+ d.id)
    .attr('cursor', 'pointer')
  }

  public createComplexRoom(svg: any, roomData: IRoom[]) {
    const rooms = this.handleComplexCoordinates(roomData);

    const plotRoomStroke = d3.line()
      .x(d => d[0])      
      .y(d => d[1])
      
    rooms.forEach(room => {
      svg = svg.append('path')
        .datum(room)
        .attr('d', plotRoomStroke(room.areaStrokes.map(stroke => [stroke.x, stroke.y])))
        .attr('stroke', 'black')
        .attr('fill', 'white')
        .attr('id', room.roomId)
        .attr('cursor', 'pointer');
    });

    return svg;
  }
 

  public handleComplexCoordinates(rooms: IRoom[]) {
    return rooms.map(room => {
      const shapes: Coordinates[] = room.secondaryCoordinates;
      shapes.push(<Coordinates>{
        xCoordinate: room.xCoordinate,
        yCoordinate: room.yCoordinate,
        width: room.width,
        height: room.height
      });
      
      const grouped = this.groupByXCoordinate(shapes);
      const roomArea = <RoomArea>{roomId: +room.id, areaStrokes: []}; 

      roomArea.areaStrokes.push(...this.getTopLevelPoints(grouped));
      roomArea.areaStrokes.push(...this.getBottomLevelPoints(grouped));
      roomArea.areaStrokes.push(roomArea.areaStrokes[0]);

      return roomArea;
    });
  }

  private getTopLevelPoints(grouped: Coordinates[][]) {
    const areaStrokes: {
      x: number;
      y: number;
    }[] = [];


    grouped.forEach(group => {
      areaStrokes.push({
        x: group[0].xCoordinate,
        y: group[0].yCoordinate
      });

      areaStrokes.push({
        x: group[0].xCoordinate + group[0].width + (this.checkLast(grouped, group[0]) ? 0: this.offset),
        y: group[0].yCoordinate
      });

    });

    return areaStrokes;
  }

  private checkLast(grouped: Coordinates[][], coordinate: Coordinates) {
    return grouped[grouped.length -1][0] === coordinate;
  }

  private getBottomLevelPoints(grouped: Coordinates[][]) {
    const areaStrokes: {
      x: number;
      y: number;
    }[] = [];

    grouped.reverse().forEach(group => {
      areaStrokes.push({
        x: group[group.length -1].xCoordinate + group[group.length -1].width,
        y: group[group.length -1].yCoordinate + group[group.length -1].height
      });

      areaStrokes.push({
        x: group[group.length -1].xCoordinate + (this.checkLast(grouped, group[0]) ? 0: this.offset),
        y: group[group.length -1].yCoordinate + group[group.length -1].height
      });
    })

    return areaStrokes;
  }


  private groupByXCoordinate(coordinates: Coordinates[]) {
    const grouped: Coordinates[][] = [];

    coordinates
    .forEach(coordinate => {
      const groupIndex = grouped.findIndex(group => group[0].xCoordinate === coordinate.xCoordinate);
      if(groupIndex >= 0)
        grouped[groupIndex].push(coordinate);
      else 
        grouped.push([coordinate]);
    });

    return grouped
    .sort((g1,g2) => g1[0].xCoordinate - g2[0].xCoordinate)
    .map(group => group.sort((c1, c2) => c1.yCoordinate - c2.yCoordinate));
  }

  public canSelect(selectedRooms: IRoom[], candidate: IRoom) {
    for(const room of selectedRooms) {
      if(room.yCoordinate === candidate.yCoordinate)
        return room.xCoordinate < candidate.xCoordinate ? this.checkRightAdd(room, candidate) : this.checkLeftAdd(room, candidate);
      
      if(room.xCoordinate === candidate.xCoordinate) 
        return room.yCoordinate < candidate.yCoordinate ? this.checkBelowAdd(room,candidate) : this.checkAboveAdd(room, candidate); 
    }

    return false;
  }

  public checkRightAdd(room: IRoom, candidate: IRoom) {
    return candidate.xCoordinate <= room.xCoordinate + room.width + this.offset && candidate.yCoordinate === room.yCoordinate;
  }

  public checkLeftAdd(room: IRoom, candidate: IRoom) {
    return candidate.xCoordinate + candidate.width >= room.xCoordinate - this.offset && candidate.yCoordinate === room.yCoordinate;
  }

  public checkAboveAdd(room: IRoom, candidate: IRoom) {
    return candidate.yCoordinate + candidate.height >= room.yCoordinate - this.offset && candidate.xCoordinate === room.xCoordinate;
  }

  public checkBelowAdd(room: IRoom, candidate: IRoom) {
    return candidate.yCoordinate <= room.yCoordinate + room.height + this.offset && candidate.xCoordinate === candidate.xCoordinate;
  }

  public canDeselect(selectedRooms: IRoom[], candidate: IRoom) {
    return selectedRooms[selectedRooms.length - 1].id === candidate.id;
  }
}
