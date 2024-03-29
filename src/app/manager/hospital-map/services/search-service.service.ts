import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoom } from '../model/room.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Accept':'application/json' });

  constructor(private http:HttpClient) { }

  searchRooms(searchRoomsFloor:any,searchRoomDTO:any):Observable<any>{
      return this.http.post<any>(this.apiHost + 'api/intranet/rooms/search/' + searchRoomsFloor,searchRoomDTO,{headers: this.headers}) 

  }
}
