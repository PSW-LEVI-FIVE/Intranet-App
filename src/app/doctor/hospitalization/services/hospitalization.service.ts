import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospitalization } from '../model/hospitalization.model';

export interface CreateHospitalizationDTO {
  bedId: number
  patientId: number
  medicalRecordId?: number
  startTime: Date
}


@Injectable({
  providedIn: 'root'
})
export class HospitalizationService {
  private url: string = "http://localhost:5000/api"
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private readonly httpClient: HttpClient
  ) { }



  finishHospitalization(id: number, end: Date) {
    const url = `${this.url}/intranet/hospitalization/end/${id}`
    const body = { endTime: end }
    return this.httpClient.patch<any>(url, body, { headers: this.headers })
  }

  generateReport(id: number) {
    const url = `${this.url}/intranet/hospitalization/${id}/generate/pdf`
    return this.httpClient.get<any>(url)
  }

  create(hosp: CreateHospitalizationDTO) {
    const url = `${this.url}/intranet/hospitalization`
    return this.httpClient.post<Hospitalization>(url, hosp, { headers: this.headers })
  }
}
