import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/appointment/"+roomId)
  }

  GetEquipmentRelocationForRoom(roomId:number):Observable<any>{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/relocation/"+roomId)
  }

  GetRenovationForRoom(roomId:number):Observable<any>{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/renovation/"+roomId)
  }

  CancelRenovationForRoom(renovationId:number){
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/cancel/renovation"+renovationId)
  }
  CancelRellocation(rellocationId:number):any{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/cancel/renovation"+rellocationId)
  }

 
  


}
