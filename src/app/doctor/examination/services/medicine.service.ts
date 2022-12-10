import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../../hospitalization/model/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private url: string = "http://localhost:5000/api/intranet"
  constructor(private readonly httpClient: HttpClient) { }



  searchMedicine(name: string) {
    const url = `${this.url}/medicine/search`
    return this.httpClient.get<Medicine[]>(url, { params: { name } })
  }
}
