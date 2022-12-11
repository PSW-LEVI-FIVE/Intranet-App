import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomOverviewService {


  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http:HttpClient) { }

  GetRoomSchedule(roomId:number):Observable<any>{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/"+roomId)
  }
}
