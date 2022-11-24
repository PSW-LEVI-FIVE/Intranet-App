import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bed } from '../model/bed.model';

@Injectable({
  providedIn: 'root'
})
export class BedService {
  private url: string = "http://localhost:5000/api"
  constructor(
    private readonly httpClient: HttpClient
  ) { }



  getBedsForRoom(roomId: number) {
    const url = `${this.url}/intranet/rooms/${roomId}/beds`
    return this.httpClient.get<Bed[]>(url)
  }

  getFreeBedsForRoom(roomId: number) {
    const url = `${this.url}/intranet/beds/room/${roomId}/free`
    return this.httpClient.get<Bed[]>(url)
  }




}
