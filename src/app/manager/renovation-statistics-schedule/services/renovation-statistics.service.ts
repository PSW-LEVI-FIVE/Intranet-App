import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvgStepCountDTO } from '../dtos/avg-step-count.dto';
import { AvgStepTimeDTO } from '../dtos/avg-step-time.dto';
import { AvgTimeDTO } from '../dtos/avg-time.dto';
import { TotalStepVisitDTO } from '../dtos/total-step-visit.dto';

@Injectable({
  providedIn: 'root'
})
export class RenovationStatisticsService {

  apiHost: string = 'http://localhost:5000/api/intranet';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  public getAverageStepCount(): Observable<AvgStepCountDTO> {
    return this.http.get<AvgStepCountDTO>(this.apiHost + 'api/intranet/renovation/avg-step-count', {headers: this.headers});
  }

  public getMergeVisitCount(): Observable<TotalStepVisitDTO> {
    return this.http.get<TotalStepVisitDTO>(this.apiHost + 'api/intranet/renovation/visit-count-merge', {headers: this.headers});
  }

  public getSplitVisitCount(): Observable<TotalStepVisitDTO> {
    return this.http.get<TotalStepVisitDTO>(this.apiHost + 'api/intranet/renovation/visit-count-split', {headers: this.headers});
  }

  public getAverageStepTimeMerge(): Observable<AvgStepTimeDTO> {
    return this.http.get<AvgStepTimeDTO>(this.apiHost + 'api/intranet/renovation/avg-step-time-merge', {headers: this.headers});
  }

  public getAverageStepTimeSplit(): Observable<AvgStepTimeDTO> {
    return this.http.get<AvgStepTimeDTO>(this.apiHost + 'api/intranet/renovation/avg-step-time-split', {headers: this.headers});
  }

  public getMinStepTimeSplit(): Observable<AvgStepTimeDTO> {
    return this.http.get<AvgStepTimeDTO>(this.apiHost + 'api/intranet/renovation/min-step-time-split', {headers: this.headers});
  }

  public getMinStepTimeMerge(): Observable<AvgStepTimeDTO> {
    return this.http.get<AvgStepTimeDTO>(this.apiHost + 'api/intranet/renovation/min-step-time-merge', {headers: this.headers});
  }

  public getMaxStepTimeSplit(): Observable<AvgStepTimeDTO> {
    return this.http.get<AvgStepTimeDTO>(this.apiHost + 'api/intranet/renovation/max-step-time-split', {headers: this.headers});
  }

  public getMaxStepTimeMerge(): Observable<AvgStepTimeDTO> {
    return this.http.get<AvgStepTimeDTO>(this.apiHost + 'api/intranet/renovation/max-step-time-merge', {headers: this.headers});
  }

  public getAverageTime(): Observable<AvgTimeDTO> {
    return this.http.get<AvgTimeDTO>(this.apiHost + 'api/intranet/renovation/avg-time', {headers: this.headers});
  }
}
