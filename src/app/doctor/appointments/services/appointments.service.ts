
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDate, ITimeInterval } from '../calendar/calendar.component';
import { ICreateAppointment } from '../create-form/create-form.component';
import { ICreateAppointmentFor, IGetAppointmentsInRange } from '../createfor-form/createfor-form.component';
import { IUpdateAppointment } from "../view-form/view-form.component";



@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  apiHost: string = 'http://localhost:5000/api';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private readonly http: HttpClient) {
  }


  getCalendarIntervalsForDate(date: Date) {
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const url = this.apiHost + `/intranet/appointments/${dateStr}/week`
    return this.http.get<IDate[]>(url, { headers: this.headers });
  }

  create(body: ICreateAppointment) {
    const url = this.apiHost + `/intranet/appointments`
    return this.http.post(url, body, { headers: this.headers })
  }

  getAppointmentById(id: number) {
    const url = this.apiHost + `/intranet/appointments/${id}`
    return this.http.get<ICreateAppointment>(url, { headers: this.headers });
  }

  cancelAppointmentById(id: number) {
    const url = this.apiHost + `/intranet/appointments/cancel/${id}`
    return this.http.patch<any>(url, { headers: this.headers });
  }

  updateAppointment(body: IUpdateAppointment, id: number) {
    const url = this.apiHost + `/intranet/appointments/${id}`
    return this.http.patch<any>(url, body, { headers: this.headers });
  }

  createFor(body: ICreateAppointmentFor) {
    const url = this.apiHost + `/intranet/appointments/for`
    return this.http.post(url, body, { headers: this.headers })
  }

  getCalendarIntervalsAroundDate(docDate: IGetAppointmentsInRange) {
    const dateStr = `${docDate.desiredDate.getFullYear()}-${docDate.desiredDate.getMonth() + 1}-${docDate.desiredDate.getDate()}`
    const url = this.apiHost + `/intranet/appointments/${dateStr}/${docDate.id}`
    return this.http.get<IDate[]>(url, { headers: this.headers });
  }

}
