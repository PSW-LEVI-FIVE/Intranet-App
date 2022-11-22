import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateBloodOrder } from '../components/create-blood-order/create-blood-order.component';

@Injectable({
  providedIn: 'root'
})
export class BloodOrderService {

  apiHost: string = 'http://localhost:5000/api';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private readonly http: HttpClient) {
  }


  create(body: ICreateBloodOrder) {
    const url = this.apiHost + `/intranet/blood-orders`
    return this.http.post(url, body, { headers: this.headers });
  }
}
