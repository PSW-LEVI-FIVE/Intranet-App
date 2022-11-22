import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateAnnualLeave } from '../components/create-annual-leave/create-annual-leave.component';
import {AnnualLeave} from "../components/view-annual-leaves/view-annual-leaves.component";

@Injectable({
  providedIn: 'root'
})
export class AnnualLeaveService {

  apiHost: string = 'http://localhost:5000/api';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private readonly http: HttpClient) {
  }


  create(body: ICreateAnnualLeave) {
    const url = this.apiHost + `/intranet/annual-leaves`
    return this.http.post(url, body, { headers: this.headers });
  }

  getAnnualLeaves(id:number){
    const url= this.apiHost + `/intranet/annual-leaves/${id}`
    return this.http.get<AnnualLeave[]>(url, { headers: this.headers });
  }

  delete(id:number){
    const docId=2;
    const url= this.apiHost + `/intranet/annual-leaves/cancel/${id}/${docId}`
    return this.http.patch<any>(url, { headers: this.headers });
  }
}
