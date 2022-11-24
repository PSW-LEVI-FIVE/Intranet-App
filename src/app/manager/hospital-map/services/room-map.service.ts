import { CreateRoom, IRoom } from './../model/room.model';
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
      if (
        !(this.checkCoordinate(newRoom.xCoordinate, room.xCoordinate, this.defaultRoomWidth) &&
          this.checkCoordinate(newRoom.yCoordinate, room.yCoordinate, this.defaultRoomHeight))
      ) break;

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

  private checkCoordinate(newCoordinate: number, oldCoordinate: number, def: number): boolean {
    return (newCoordinate >= oldCoordinate && newCoordinate <= oldCoordinate + def)
  }

  private checkBorderFit(newCoordinate: number, def: number, map: number): boolean {
    return (newCoordinate + 2 * def + this.offset < map);
  }

  getByID(id: number): Observable<IRoom> {
    return this.http.get<IRoom>(this.apiHost + 'api/intranet/rooms/' + id, {headers: this.headers});
  }
  getRoomsByBuilding(id: number): Observable<IRoom> {
    return this.http.get<IRoom>(this.apiHost + 'api/intranet/map/rooms/' + id, {headers: this.headers});
  }
  updateRoom(room: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/rooms/' + room.roomNumber, room.number, {headers: this.headers});
  }

  // getData(){
  //   var data2 = [{
  //     "x": 160,
  //     "y": 150,
  //     "w": 105,
  //     "h": 45,
  //     "name": "Room 1",
  //     "id": "r1"
  //   },
  //   {
  //     "x": 273,
  //     "y": 150,
  //     "w": 100,
  //     "h": 45,
  //     "name": "Room 2",
  //     "id": "r2"
  //   },
  //   {
  //     "x": 381,
  //     "y": 150,
  //     "w": 105,
  //     "h": 45,
  //     "name": "Room 3",
  //     "id": "r3"
  //   },
  //   {
  //     "x": 160,
  //     "y": 200,
  //     "w": 105,
  //     "h": 65,
  //     "name": "Room 4",
  //     "id": "r4"
  //   },
  //   {
  //     "x": 272,
  //     "y": 200,
  //     "w": 215,
  //     "h": 65,
  //     "name": "Room 5",
  //     "id": "r5"
  //   } ]
  //   return data2;
  // }

  createRectangles(svg:any, data2:any){
    return svg.selectAll("rect").data(data2).enter().append("rect")
    .attr("height", function(d:any){ return d.height;})
    .attr("width", function(d:any){ return d.width;})
    .attr("fill", '#d7d5db')
    .attr("stroke", "black")
    .attr("x", function(d:any){ return d.xCoordinate })
    .attr("y", function(d:any){ return d.yCoordinate})
    .attr("id", function(d:any){ return d.id})
    .attr('cursor', 'pointer')
    
  }
}
