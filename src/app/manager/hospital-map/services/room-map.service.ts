import { CreateRoom, IRoom, IRoomModel } from './../model/room.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  createRectangles(svg:any,data:any){
    return svg.selectAll("rect").data(data).enter().append("rect")
    .attr("height", function(d:any){ return d.height;})
    .attr("width", function(d:any){ return d.width;})
    .attr("fill", 'white')
    .attr("stroke", "black")
    .attr("x", function(d:any){ return d.xCoordinate })
    .attr("y", function(d:any){ return d.yCoordinate})
    .attr('id',function(d:any){ return "id"+ d.id})
    .attr('cursor', 'pointer')
  }
}
