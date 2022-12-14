import { IStatistic } from './../model/statistic.model';
import { IDoctor } from './../model/doctor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsLeaveStatisticsService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getDoctors(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>(this.apiHost + 'api/intranet/doctors', {headers: this.headers});
  }
  getStatistics(id:any):Observable<IStatistic[]> {
    return this.http.get<IStatistic[]>(this.apiHost + 'api/intranet/annual-leaves/statistics/'+ id, {headers: this.headers});
  }
}
