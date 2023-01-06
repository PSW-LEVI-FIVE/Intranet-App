import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AvgMinMaxStatsDTO } from "../dtos/avg-min-max-stats.dto";
import { StepStatsDTO } from "../dtos/step-stats.dto";
import { SuccessfulUnsuccessfulSpecialtyDTO } from "../dtos/succ-unsucc-spec.dto";
import { SuccessfulUnsuccessfulDTO } from "../dtos/succ-unsucc.dto";


@Injectable({
    providedIn: 'root'
})
export class ReportStatisticsService {
    private url: string = "http://localhost:5000/api/intranet/examination/statistics/"


    constructor(
        private readonly httpClient: HttpClient
    ) { }



    getSuccUnsuccStats() {
        const url = this.url + "succ-unsucc"
        return this.httpClient.get<SuccessfulUnsuccessfulDTO>(url)
    }

    getSpecialtySuccUnsuccStats() {
        const url = this.url + "succ-unsucc-spec"
        return this.httpClient.get<SuccessfulUnsuccessfulSpecialtyDTO[]>(url)
    }

    getStepsStats() {
        const url = this.url + "steps"
        return this.httpClient.get<StepStatsDTO>(url)
    }

    getHourStats() {
        const url = this.url + "hours"
        return this.httpClient.get<any>(url)
    }

    getAvgMinMaxTimeStats() {
        const url = this.url + "min-max-avg"
        return this.httpClient.get<AvgMinMaxStatsDTO>(url)
    }
}