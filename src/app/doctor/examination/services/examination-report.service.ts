import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../../hospitalization/model/medicine.model';
import { CreateExaminationReportDTO } from '../dtos/create-examination-report.dto';
import { ExaminationReportEventDTO } from '../dtos/examination-report-event.dto';

@Injectable({
    providedIn: 'root'
})
export class ExaminationReportService {
    private url: string = "http://localhost:5000/api/intranet"
    constructor(private readonly httpClient: HttpClient) { }

    searchReports(searchTerm:any){
      const url = `${this.url}/examination/search`
      return this.httpClient.post<any>(url,  searchTerm)
    }

    startReport(examinationId: number) {
        const url = `${this.url}/examination/report`
        return this.httpClient.post<any>(url, { examinationId })
    }

    sendReport(dto: CreateExaminationReportDTO, uuid: string) {
        const url = `${this.url}/examination/report/${uuid}`
        return this.httpClient.patch<any>(url, dto)
    }

    sendEvent(dto: ExaminationReportEventDTO) {
        const url = `${this.url}/examination/report/event`
        return this.httpClient.post<any>(url, dto)
    }

    getReportByExaminationId(id: number) {
        const url = `${this.url}/examination/${id}/report`
        return this.httpClient.get<any>(url)
    }
}
