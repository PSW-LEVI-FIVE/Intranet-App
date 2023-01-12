import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { NgModule } from '@angular/core';
import { SchedulingAppointmentStatisticsService } from './services/scheduling-appointment-statistics.service';
import { averageTimesOnAndQuitedDTO } from './dtos/averageTimesOnAndQuitedDTO';

@Component({
  selector: 'app-scheduling-appointment-statistics',
  templateUrl: './scheduling-appointment-statistics.component.html',
  styleUrls: ['./scheduling-appointment-statistics.component.css']
})
export class SchedulingAppointmentStatisticsComponent implements OnInit {

  stepAverageData: ChartData<"bar", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }
  timeOnStepData: ChartData<"bar", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }
  timePerAgeData: ChartData<"bar", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }
  averageScheduleData: ChartData<"bar", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }
  quitOnStepData: ChartData<"bar", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }
  longTermedSteps?: averageTimesOnAndQuitedDTO

  stepAverageLoading = true
  timeOnStepLoading = true
  timePerAgeLoading = true
  averageScheduleLoading = true
  quitOnStepLoading = true
  public fromAge: number = 15;
  public toAge: number = 30;

  stepAverageOptions: any = {
    color: 'blue',
    backgroundColor: 'blue',
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        position: 'top',
        text: 'Average time on Step in seconds'
      }
    }
  }

  timeOnStepOptions: any = {
    color: 'black',
    borderColor: 'black',
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        possition: 'top',
        text: 'How Many times patients have been on step'
      }
    }
  }

  timePerAgeOptions: any = {
    color: 'orange',
    backgroundColor: 'orange',
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        position: 'top',
        text: 'Time Scheduling Appointments Per Age in seconds'
      }
    }
  }

  averageScheduleOptions: any = {
    color: 'purple',
    backgroundColor: 'purple',
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        position: 'top',
        text: 'Average time to schedule appointment in seconds'
      }
    }
  }

  quitOnStepOptions: any = {
    color: 'green',
    backgroundColor: 'green',
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        position: 'top',
        text: 'Times quited on steps'
      }
    }
  }

  constructor(
    private readonly schedulingAppointmentStatisticsService: SchedulingAppointmentStatisticsService
  ) { }

  agesFocusOut(){
    if (this.fromAge > 300) this.fromAge = 300;
    if (this.toAge < 0) this.toAge = 0;
    if (this.toAge > 300) this.toAge = 300;
    if (this.fromAge < 0) this.fromAge = 0;
  }


  changeStatistics(){
    this.schedulingAppointmentStatisticsService.getAverageTimeToScheduleInAgeRange(this.fromAge,this.toAge).subscribe(res => {
      const data = [res.time]
      const labels = ['Average Time To Schedule Appointment For Age']
      this.timePerAgeData = { datasets: [{ data }], labels }
      this.timePerAgeLoading = false
    })
  }
  ngOnInit(): void {

    this.schedulingAppointmentStatisticsService.getLongTermedSteps().subscribe(res=>{
        this.longTermedSteps = res;
    })

    this.schedulingAppointmentStatisticsService.getAverageTimeOnStep().subscribe(res => {
      const data = [res.dateStep,res.specialityStep, res.doctorStep,res.timeStep ,res.finishedStep]
      const labels = ['Date Step', 'Speciality Step', 'Doctor Step', 'Time Step', 'Done Step']
      this.stepAverageData = { datasets: [{ data }], labels }
      this.stepAverageLoading = false
    })


    this.schedulingAppointmentStatisticsService.getHowManyTimesHaveBeenOnStep().subscribe(res => {
      const data = [res.dateStep,res.specialityStep, res.doctorStep,res.timeStep ,res.finishedStep]
      const labels = ['Date Step', 'Speciality Step', 'Doctor Step', 'Time Step', 'Done Step']
      this.timeOnStepData = { datasets: [{ data }], labels }
      this.timeOnStepLoading = false
    })

    this.schedulingAppointmentStatisticsService.getAverageTimeToScheduleInAgeRange(0,100).subscribe(res => {
      const data = [res.time]
      const labels = ['Average Time To Schedule Appointment For Age']
      this.timePerAgeData = { datasets: [{ data }], labels }
      this.timePerAgeLoading = false
    })

    this.schedulingAppointmentStatisticsService.getAverageTimeToSchedule().subscribe(res => {
      const data = [res.time]
      const labels = ['Average Time To Schedule Appointment']
      this.averageScheduleData = { datasets: [{ data }], labels }
      this.averageScheduleLoading = false
    })

    this.schedulingAppointmentStatisticsService.getQuitOnStep().subscribe(res => {
      const data = [res.dateStep,res.specialityStep, res.doctorStep,res.timeStep ,res.finishedStep]
      const labels = ['Date Step', 'Speciality Step', 'Doctor Step', 'Time Step', 'Done Step']
      this.quitOnStepData = { datasets: [{ data }], labels }
      this.quitOnStepLoading = false
    })
  }


}
