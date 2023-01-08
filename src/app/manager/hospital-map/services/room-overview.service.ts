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

<<<<<<< HEAD
  getRoomSchedule(roomId:number):Observable<any>{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/appointment/"+roomId)
  }

  getEquipmentRelocationForRoom(roomId:number):Observable<any>{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/relocation/"+roomId)
  }

  getRenovationForRoom(roomId:number):Observable<any>{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/renovation/"+roomId)
  }

  cancelRenovationForRoom(renovationId:number):any{
    return this.http.get<any>(this.apiHost+"api/intranet/rooms/schedule/cancel/renovation/"+renovationId)
  }
  cancelRellocation(rellocationId:number):any{
    return this.http.get<any>(this.apiHost+"api/intranet/rooms/schedule/cancel/relocation/"+rellocationId)
  }

  getEquipmentName(equipmentId:number):Observable<any>{
    return this.http.get<any>(this.apiHost+"api/intranet/equipment/get/"+equipmentId)
=======
  GetRoomSchedule(roomId:number):Observable<any>{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/appointment/"+roomId)
  }

  getEquipmentRelocationForRoom(roomId:number):Observable<any>{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/relocation/"+roomId)
  }

  getRenovationForRoom(roomId:number):Observable<any>{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/renovation/"+roomId)
  }

<<<<<<< HEAD
  CancelRenovationForRoom(renovationId:number){
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/cancel/renovation"+renovationId)
  }
  CancelRellocation(rellocationId:number):any{
    return this.http.get(this.apiHost+"api/intranet/rooms/schedule/cancel/renovation"+rellocationId)
>>>>>>> 68cc2e7 (refactored code)
=======
  cancelRenovationForRoom(renovationId:number):any{
    return this.http.get<any>(this.apiHost+"api/intranet/rooms/schedule/cancel/renovation/"+renovationId)
  }
  cancelRellocation(rellocationId:number):any{
    return this.http.get<any>(this.apiHost+"api/intranet/rooms/schedule/cancel/relocation/"+rellocationId)
  }

  getEquipmentName(equipmentId:number):Observable<any>{
    return this.http.get<any>(this.apiHost+"api/intranet/equipment/get/"+equipmentId)
>>>>>>> 64b84c5 (refactored code)
  }

 
  


}
