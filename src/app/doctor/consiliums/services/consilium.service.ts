import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateConsiliumDTO, GetBestConsiliumsDTO, IDoctorDTO, ISpecialityDTO } from '../components/create-consilium/create-consilium.component';

@Injectable({
  providedIn: 'root'
})
export class ConsiliumService {

  apiHost: string = 'http://localhost:5000/api';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private readonly http: HttpClient) {
  }

  getAllDoctors() {
    const url = this.apiHost + `/intranet/doctors`
    return this.http.get<IDoctorDTO[]>(url, { headers: this.headers });
  }

  getAllSpecialities() {
    const url = this.apiHost + `/intranet/doctors/specialities`
    return this.http.get<ISpecialityDTO[]>(url, { headers: this.headers });
  }

  getSuggestedSlots(body: GetBestConsiliumsDTO) {
    const url = this.apiHost + `/intranet/consilium/suggest`
    return this.http.post<GetBestConsiliumsDTO>(url, body, { headers: this.headers });
  }

  create(body: CreateConsiliumDTO | undefined) {
    const url = this.apiHost + `/intranet/consilium`
    return this.http.post(url, body, { headers: this.headers });
  }
}
