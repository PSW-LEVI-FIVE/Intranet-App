import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../../equipment/model/equipment.model';
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

  getRoomEquipment(roomId: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiHost + '/rooms/equipment/room/' + roomId, { headers: this.headers })
  }

  getRoomsbyFloor(floorId: number): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiHost + '/rooms/floor/' + floorId, { headers: this.headers });
  }
}
