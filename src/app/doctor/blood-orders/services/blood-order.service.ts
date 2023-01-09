import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateBloodOrder } from '../components/create-blood-order/create-blood-order.component';
import { IShowBloodOrder } from '../components/view-blood-orders/view-blood-orders.component';
import { IBlood } from '../components/view-blood-supplies/view-blood-supplies.component';

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

  getBloodOrders() {
    const url = this.apiHost + `/intranet/blood-orders`;
    return this.http.get<IShowBloodOrder[]>(url)
  }

  getBloodSupply() {
    const url = this.apiHost + `/intranet/blood-storage`;
    return this.http.get<IBlood[]>(url)
  }

}
