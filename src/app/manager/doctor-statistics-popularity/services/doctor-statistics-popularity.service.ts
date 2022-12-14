import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctorWithPopularityDTO } from '../model/IDoctorWithPopularityDTO';

@Injectable({
  providedIn: 'root'
})
export class DcotorStatisticsPopularityService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getDoctorsWithPopularity(fromAge:number,toAge:number): Observable<IDoctorWithPopularityDTO[]> {
    return this.http.get<IDoctorWithPopularityDTO[]>(this.apiHost + 'api/intranet/doctors/statistics/DocsWithPopularity' + '?minAge=' + fromAge + '&maxAge=' + toAge, {headers: this.headers});
  }
}
