import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAllergenWithPatients } from '../model/IAllergenWithPatients';

@Injectable({
  providedIn: 'root'
})
export class AllergenStatsService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllergensWithPatients(): Observable<IAllergenWithPatients[]> {
    return this.http.get<IAllergenWithPatients[]>(this.apiHost + 'api/intranet/allergen/statistics/AllergensWithPatients', {headers: this.headers});
  }
}
