import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommercial } from '../models/commercial.model';

@Injectable({
  providedIn: 'root'
})
export class CreateCommercialsService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  createCommercial(commercial: ICommercial): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/intranet/advertisement/create', commercial, {headers: this.headers});
    }
}
