import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MergeDTO } from '../shared/merge.model';
import { TimeInterval, TimeSlotRegDTO } from '../shared/model';
import { SplitDTO } from '../shared/split.model';
import { RenovationEventDto } from '../shared/renovation-event-dto';
import { CreateEventDto } from '../shared/create-event-dto';
import { AddEventDto } from '../shared/add-event-dto';
import { RenovationDto } from '../shared/renovation-dto';

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
  createEvent(createEventDto: CreateEventDto): Observable<RenovationEventDto>{
    return this.http.post<RenovationEventDto>(this.apiHost + '/renovation/create/event', createEventDto, { headers: this.headers })
  }

  addEvent(addEventDto: AddEventDto): Observable<any>{
    return this.http.post<any>(this.apiHost + '/renovation/add/event', addEventDto, { headers: this.headers })
  }

  updateEvent(renovationEventDto: RenovationEventDto): Observable<RenovationDto>{
    return this.http.post<RenovationDto>(this.apiHost + '/renovation/update/event', renovationEventDto, { headers: this.headers })
  }
}
