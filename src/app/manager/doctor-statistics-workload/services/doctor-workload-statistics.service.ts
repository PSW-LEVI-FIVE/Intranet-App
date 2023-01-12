import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctor } from '../../doctor-statistics-leaves/model/doctor.model';
import { IWorkloadStatistic } from '../model/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorWorkloadStatisticsService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getDoctors(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>(this.apiHost + 'api/intranet/doctors', {headers: this.headers});
  }
  getYearStatistics(id:any):Observable<IWorkloadStatistic[]> {
    return this.http.get<IWorkloadStatistic[]>(this.apiHost + 'api/intranet/appointments/statistics/year/'+ id, {headers: this.headers});
  }
  getMonthStatistics(id:any, month:any):Observable<IWorkloadStatistic[]> {
    return this.http.get<IWorkloadStatistic[]>(this.apiHost + 'api/intranet/appointments/statistics/month/'+ month +'/'+ id, {headers: this.headers});
  }
  getTimeRangeStatistics(id:any, start:any, end:any):Observable<IWorkloadStatistic[]> {
    const startStr = `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`
    const endStr = `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`
    return this.http.get<IWorkloadStatistic[]>(this.apiHost + 'api/intranet/appointments/statistics/interval/'+ id + '/' + startStr + '/' + endStr , {headers: this.headers});
  }
}
