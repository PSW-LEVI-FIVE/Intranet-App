import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../room/model/room.model';
import { Equipment } from '../model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  apiHost: string = 'http://localhost:5000/api/intranet';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  searchEquipmentInRoom(equipment: Equipment): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(this.apiHost + '/equipment/search' + '?Name=' + equipment.name + '&Quantity=' + equipment.quantity + '&roomId=' + equipment.roomId, { headers: this.headers })
  }

  searchRoomsByFloorContainigEquipment(equipment: Equipment): Observable<Room[]>{
    return this.http.get<Room[]>(this.apiHost + '/equipment/floor-search' + '?Name=' + equipment.name + '&Quantity=' + equipment.quantity + '&roomId=' + equipment.roomId, { headers: this.headers })
  }
  getEquipmentByRoom(roomId:number):Observable<Equipment[]>{
    return this.http.get<any>(this.apiHost+'/equipment/room/'+roomId)
  }
}
