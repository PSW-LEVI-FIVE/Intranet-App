import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentForRoom, ICreateAppointment, IntervalDto, TimeInterval } from '../../room-allocation-form/room-allocation-form.component';
import { Room } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiHost: string = 'http://localhost:5000/api/intranet';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiHost + '/rooms', { headers: this.headers });
  }

  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(this.apiHost + '/rooms/' + id, { headers: this.headers });
  }

  deleteRoom(id: any): Observable<any> {
    return this.http.delete<any>(this.apiHost + '/rooms/' + id, { headers: this.headers });
  }

  createRoom(room: any): Observable<any> {
    return this.http.post<any>(this.apiHost + '/rooms', room, { headers: this.headers });
  }

  updateRoom(room: any): Observable<any> {
    return this.http.put<any>(this.apiHost + '/rooms/' + room.id, room, { headers: this.headers });
  }
  getInterval(reallocationDTO:IntervalDto):  Observable<TimeInterval[]>{
    return this.http.post<any>(this.apiHost + '/EquipmentReallocation/' , reallocationDTO, { headers: this.headers });
  }
  getEquipment(roomId:number): Observable<EquipmentForRoom[]> {
    return this.http.get<EquipmentForRoom[]>(this.apiHost + '/EquipmentReallocation/room/'+roomId, { headers: this.headers });
  }

  createReallocation(reallocationDTO:ICreateAppointment):  Observable<ICreateAppointment>{
    return this.http.post<any>(this.apiHost + '/EquipmentReallocation/Create' ,reallocationDTO , { headers: this.headers });
  }
}
