import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodConsumption } from '../model/blood-consumption.model';


@Injectable({
  providedIn: 'root'
})
export class BloodConsumptionService {

  private url: string = "http://localhost:5000/api"

  constructor(private readonly http: HttpClient) { }

  getBloodConsumption() {
    const url = `${this.url}/intranet/therapies/blood-consumption`;
    return this.http.get<BloodConsumption[]>(url)
  }
}
