import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../../room/model/room.model';
import { Observable } from 'rxjs';
import { Equipment } from '../model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  apiHost: string = 'http://localhost:5000/api/intranet';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  searchInRoom(equipment: any): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiHost + '/equipment/floorSearch' + '?Name=' + equipment.name + '&Quantity=' + equipment.quantity + '&roomId=' + equipment.RoomId, { headers: this.headers });
  }

  searchOnFloor(equipment: any): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiHost + '/equipment/search' + '?Name=' + equipment.name + '&Quantity=' + equipment.quantity + '&roomId=' + equipment.RoomId, { headers: this.headers });
  }
}
