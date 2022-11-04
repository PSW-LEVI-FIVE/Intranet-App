import { IRoom } from './../model/room.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomMapService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getRoomsByBuilding(id: number): Observable<IRoom> {
    return this.http.get<IRoom>(this.apiHost + 'api/intranet/rooms/' + id, {headers: this.headers});
  }
  updateRoom(room: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/rooms/' + room.id, room.name, {headers: this.headers});
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
