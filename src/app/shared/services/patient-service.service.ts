import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISelectPatient } from 'src/app/doctor/appointments/create-form/create-form.component';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiHost: string = 'http://localhost:5000/api';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private readonly http: HttpClient
  ) { }


  getAll() {
    const url = this.apiHost + `/intranet/patients`
    return this.http.get<ISelectPatient[]>(url, { headers: this.headers })
  }
}
