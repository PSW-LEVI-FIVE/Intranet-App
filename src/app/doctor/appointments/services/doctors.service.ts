import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IDoctorDTO, ISpecialityDTO } from "../createfor-form/createfor-form.component";

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    apiHost: string = 'http://localhost:5000/api';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private readonly http: HttpClient) {
    }

    getAllSpecialities() {
        const url = this.apiHost + `/intranet/doctors/specialities`
        return this.http.get<ISpecialityDTO[]>(url, { headers: this.headers });
    }

    getAllDoctorsBySpec(speciality: number | null) {
        const url = this.apiHost + `/intranet/doctors/specialities/${speciality}`
        return this.http.get<IDoctorDTO[]>(url, { headers: this.headers });
    }

}