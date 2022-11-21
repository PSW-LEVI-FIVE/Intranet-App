import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IGiveBloodTherapy } from "../give-therapy-form/components/give-blood-therapy/give-blood-therapy.component";
import { IGiveMedicineTherapy } from "../give-therapy-form/components/give-medicine-therapy/give-medicine-therapy.component";
import { Medicine } from '../model/medicine.model';
import { Blood } from '../model/blood.model';

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

  getMedicine() {
    const url = `${this.url}/intranet/medicine`;
    return this.httpClient.get<Medicine[]>(url)
  }

  getBlood() {
    const url = `${this.url}/intranet/blood-storage`;
    return this.httpClient.get<Blood[]>(url)
  }


}
