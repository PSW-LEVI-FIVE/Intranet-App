import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Symptom } from '../model/symptom.model';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {
  private url: string = "http://localhost:5000/api/intranet"
  constructor(private readonly httpClient: HttpClient) { }



  searchSymptoms(name: string) {
    const url = `${this.url}/symptoms/search`
    return this.httpClient.get<Symptom[]>(url, { params: { name } });
  }
}
