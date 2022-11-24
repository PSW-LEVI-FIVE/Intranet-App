import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnualLeaveService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }
  // U BEKU DODATI GET ALL NEZAVISNO OD DOKTORA
  // getAnnualLeaves(): Observable<IAnnualLeave[]> {
  //   return this.http.get<IAnnualLeave[]>(this.apiHost + 'api/intranet/annual-leaves', {headers: this.headers});
  // }
}
