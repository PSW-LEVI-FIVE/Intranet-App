import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IGiveBloodTherapy } from "../give-therapy-form/components/give-blood-therapy/give-blood-therapy.component";
import { IGiveMedicineTherapy } from "../give-therapy-form/components/give-medicine-therapy/give-medicine-therapy.component";
import { Medicine } from '../model/medicine.model';
import { BloodType } from '../model/blood.model';
import { TherapiesDto } from '../model/therapiesDto.model';

@Injectable({
  providedIn: 'root'
})
export class TherapyService {

  private url: string = "http://localhost:5000/api"

  constructor(private readonly httpClient: HttpClient) { }

  createBloodTherapy(body: IGiveBloodTherapy) {
    const url = `${this.url}/intranet/therapies/blood`;
    return this.httpClient.post(url, body)
  }

  createMedicineTherapy(body: IGiveMedicineTherapy) {
    const url = `${this.url}/intranet/therapies/medicine`;
    return this.httpClient.post(url, body)
  }

  getMedicine(id: number) {
    const url = `${this.url}/intranet/medicine/compatibile/` + id;
    return this.httpClient.get<Medicine[]>(url)
  }

  getBlood(id: number) {
    const url = `${this.url}/intranet/blood-storage/compatibile/` + id;
    return this.httpClient.get<number[]>(url)
  }

  getHospitalizationTherapies(id: number) {
    const url = `${this.url}/intranet/therapies/hospitalization/` + id;
    return this.httpClient.get<TherapiesDto[]>(url)
  }

}
