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
     searchRoomDTO = JSON.stringify(searchRoomDTO)
     console.log(searchRoomDTO)
      return this.http.post<IRoom[]>(this.apiHost + 'api/intranet/rooms/search/' + searchRoomsFloor,searchRoomDTO,{headers: this.headers})
    /*.pipe(tap(data=>{
      console.log(data)
      console.log("hahahahahha")
    }))*/
      

  }
}
