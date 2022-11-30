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
