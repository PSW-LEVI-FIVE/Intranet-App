import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../../hospitalization/model/medicine.model';
import { CreateExaminationReportDTO } from '../dtos/create-examination-report.dto';

@Injectable({
    providedIn: 'root'
})
export class ExaminationReportService {
    private url: string = "http://localhost:5000/api/intranet"
    constructor(private readonly httpClient: HttpClient) { }


    startReport(examinationId: number) {
        const url = `${this.url}/examination/report`
        return this.httpClient.post<any>(url, { examinationId })
    }

    sendReport(dto: CreateExaminationReportDTO, uuid: string) {
        const url = `${this.url}/examination/report/${uuid}`
        return this.httpClient.patch<any>(url, dto)
    }

    getReportByExaminationId(id: number) {
        const url = `${this.url}/examination/${id}/report`
        return this.httpClient.get<any>(url)
    }
}
