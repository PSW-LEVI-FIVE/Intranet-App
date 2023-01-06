import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MergeDTO, SplitDTO, TimeInterval, TimeSlotRegDTO } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class RenovationService {

  apiHost: string = 'http://localhost:5000/api/intranet';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getTimeSlots(timeSlotDto: TimeSlotRegDTO): Observable<TimeInterval[]>{
    return this.http.post<TimeInterval[]>(this.apiHost + '/renovation/timeslot',JSON.stringify(timeSlotDto), { headers: this.headers })
  }

  createMerge(mergeDto: MergeDTO): Observable<TimeInterval[]>{
    return this.http.post<TimeInterval[]>(this.apiHost + '/renovation/create/merge', mergeDto, { headers: this.headers })
  }

  createSplit(splitDto: SplitDTO): Observable<TimeInterval[]>{
    return this.http.post<TimeInterval[]>(this.apiHost + '/renovation/create/split', splitDto, { headers: this.headers })
  }
}
