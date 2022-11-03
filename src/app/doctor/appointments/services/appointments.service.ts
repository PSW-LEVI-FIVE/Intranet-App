import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDate, ITimeInterval } from '../calendar/calendar.component';
import { ICreateAppointment } from '../create-form/create-form.component';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  apiHost: string = 'http://localhost:5000/api';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private readonly http: HttpClient) { }


  getCalendarIntervalsForDate(date: Date) {
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const url = this.apiHost + `/intranet/appointments/${dateStr}/week`
    return this.http.get<IDate[]>(url, { headers: this.headers });
  }


  create(body: ICreateAppointment) {
    const url = this.apiHost + `/intranet/appointments`
    return this.http.post(url, body, { headers: this.headers })
  }
}
