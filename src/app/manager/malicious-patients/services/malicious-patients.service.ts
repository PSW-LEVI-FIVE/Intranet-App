import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMaliciousPatient } from '../model/malicious-patients.model';

@Injectable({
  providedIn: 'root'
})
export class MaliciousPatientsService {

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiHost: string = 'http://localhost:5000/';
  constructor(private http: HttpClient) { }

  getMaliciousPatients(): Observable<IMaliciousPatient[]> {
    return this.http.get<IMaliciousPatient[]>(this.apiHost + 'api/intranet/patients/maliciouspatints');
  }

  blockPatient(patient: IMaliciousPatient): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/login/blockuser' + '?id=' + patient.id, {headers: this.headers});
  }

  unblockPatient(patient: IMaliciousPatient): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/login/unblockuser' + '?id=' +  patient.id, {headers: this.headers});
  }
}
