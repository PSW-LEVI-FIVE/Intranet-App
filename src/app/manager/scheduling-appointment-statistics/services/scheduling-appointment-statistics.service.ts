import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessfulUnsuccessfulDTO } from '../../examination-report-statistics/dtos/succ-unsucc.dto';
import { averageTimesOnAndQuitedDTO } from '../dtos/averageTimesOnAndQuitedDTO';
import { scheduleTimeDTO } from '../dtos/scheduleTimeDTO';

@Injectable({
  providedIn: 'root'
})
export class SchedulingAppointmentStatisticsService {

  private url: string = "http://localhost:5000/api/intranet/appointments/statistics/"

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    getAverageTimeOnStep() {
        const url = this.url + "stepAverage"
        return this.httpClient.get<averageTimesOnAndQuitedDTO>(url)
    }

    getHowManyTimesHaveBeenOnStep() {
      const url = this.url + "timeOnStep"
      return this.httpClient.get<averageTimesOnAndQuitedDTO>(url)
    }

    getAverageTimeToScheduleInAgeRange(fromAge: number,toAge: number) {
    const url = this.url + "timePerAge/" + fromAge + '/' + toAge; 
    return this.httpClient.get<scheduleTimeDTO>(url)
    }

    getAverageTimeToSchedule() {
    const url = this.url + "averageScheduleTime"
    return this.httpClient.get<scheduleTimeDTO>(url)
    }

    getQuitOnStep() {
    const url = this.url + "quitOnStep"
    return this.httpClient.get<averageTimesOnAndQuitedDTO>(url)
    }

    getLongTermedSteps() {
      const url = this.url + "longTermed"
      return this.httpClient.get<averageTimesOnAndQuitedDTO>(url)
    }
}
