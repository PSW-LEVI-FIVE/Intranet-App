import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospitalization } from '../model/hospitalization.model';
import { MedicalRecord } from '../model/medical-record.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  private url: string = "http://localhost:5000/api"

  constructor(private readonly httpClient: HttpClient) { }



  getHospitalizations(id: number) {
    const url = `${this.url}/intranet/hospitalization/patient/${id}`;
    return this.httpClient.get<Hospitalization[]>(url)
  }

  getMedicalRecordForPatient(id: number) {
    const url = `${this.url}/intranet/medical-records/patient/${id}`
    return this.httpClient.get<MedicalRecord>(url);
  }

  getMedicalRecordByUID(uid: string) {
    const url = `${this.url}/intranet/medical-records/uid/${uid}`
    return this.httpClient.get<MedicalRecord>(url);
  }
}
