import { IAnnualLeave } from './../model/annual-leave.model';
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
  getAnnualLeaves(): Observable<IAnnualLeave[]> {
    return this.http.get<IAnnualLeave[]>(this.apiHost + 'api/intranet/annual-leaves/pending', {headers: this.headers});
  }
  reviewAnnualLeave(id:any, leave: any): Observable<any> {
    return this.http.patch<any>(this.apiHost + 'api/intranet/annual-leaves/review/' + id, leave, { headers: this.headers });
  }
}
