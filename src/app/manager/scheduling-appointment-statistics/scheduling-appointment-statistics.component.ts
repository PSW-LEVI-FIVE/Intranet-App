import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SchedulingAppointmentStatisticsService } from './services/scheduling-appointment-statistics.service';

@Component({
  selector: 'app-scheduling-appointment-statistics',
  templateUrl: './scheduling-appointment-statistics.component.html',
  styleUrls: ['./scheduling-appointment-statistics.component.css']
})
export class SchedulingAppointmentStatisticsComponent implements OnInit {

  stepAverageLoading = true
  timeOnStepLoading = true
  timePerAgeLoading = true
  timeOnStepMore30SecondsLoading = true
  averageScheduleLoading = true
  quitOnStepLoading = true
  public fromAge: number = 15;
  public toAge: number = 30;
  public chart?: Chart;

  constructor(
    private readonly schedulingAppointmentStatisticsService: SchedulingAppointmentStatisticsService
  ) { }

  agesFocusOut(){
    if (this.fromAge > 300) this.fromAge = 300;
    if (this.toAge < 0) this.toAge = 0;
    if (this.toAge > 300) this.toAge = 300;
    if (this.fromAge < 0) this.fromAge = 0;
  }

  ngOnInit(): void {

    this.getLongTermedSteps();
    this.getAverageTimeOnStep();
    this.getHowManyTimesHaveBeenOnStep();
    this.getAverageTimeToScheduleInAgeRange();
    this.getAverageTimeToSchedule();
    this.getQuitOnStep();
  }
    public changeStatistics(){
        this.chart = Chart.getChart("bar-per-age-count");
        this.chart?.destroy();
        this.timePerAgeLoading = true;
        this.getAverageTimeToScheduleInAgeRange(this.fromAge,this.toAge);
    }

    private getLongTermedSteps() {
        this.schedulingAppointmentStatisticsService.getLongTermedSteps().subscribe(res => {
            let ctx = document.getElementById("bar-times-on-step-more-30-seconds") as HTMLCanvasElement;
            this.chart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['Date Step', 'Speciality Step', 'Doctor Step', 'Time Step', 'Done Step'],
               datasets: [
                {
                    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
                    data: [res.dateStep,res.specialityStep,res.doctorStep,res.timeStep,res.finishedStep]
                }
              ]
             },
             options: {
                maintainAspectRatio:false,
                plugins :{
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Average TIME spent on scheduling'
                }
                }}
        });
        this.timeOnStepMore30SecondsLoading = false;
    });
    }

    private getQuitOnStep() {
        this.schedulingAppointmentStatisticsService.getQuitOnStep().subscribe(res => {
            let ctx = document.getElementById("bar-quit-on-step") as HTMLCanvasElement;
            this.chart = new Chart(ctx, {
              type: 'bar',
              data: {
               labels: ['Date Step', 'Speciality Step', 'Doctor Step', 'Time Step', 'Done Step'],
               datasets: [
                {
                    label: "times",
                    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
                    data: [res.dateStep,res.specialityStep,res.doctorStep,res.timeStep,res.finishedStep]
                }
              ]
             },
             options: {
                maintainAspectRatio:false,
                plugins :{
                legend: { display: false },
                title: {
                    display: true,
                    text: 'How many times did patient quit scheduling on each step'
                }
                }}
        });
        this.quitOnStepLoading = false;
        });
    }

    private getAverageTimeToSchedule() {
        this.schedulingAppointmentStatisticsService.getAverageTimeToSchedule().subscribe(res => {
            let ctx = document.getElementById("bar-average-schedule") as HTMLCanvasElement;
            this.chart = new Chart(ctx, {
              type: 'bar',
              data: {
               labels: ["seconds"],
               datasets: [
                {
                    label: "seconds",
                    backgroundColor: ["#f5a30a"],
                    data: [res.time]
                }
              ]
             },
             options: {
                maintainAspectRatio:false,
                plugins :{
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Average TIME spent on scheduling'
                }
            }}
        });
        this.averageScheduleLoading = false;
        });
    }

    private getAverageTimeToScheduleInAgeRange(fromAge:number=0,toAge:number=300) {
        this.schedulingAppointmentStatisticsService.getAverageTimeToScheduleInAgeRange(fromAge, toAge).subscribe(res => {
            let ctx = document.getElementById("bar-per-age-count") as HTMLCanvasElement;
            this.chart = new Chart(ctx, {
              type: 'bar',
              data: {
               labels: ['Average time to schedule by this age range'],
               datasets: [
                {
                    label: "times",
                    backgroundColor: ["#b1d0e0"],
                    data: [res.time]
                }
              ]
             },
             options: {
                maintainAspectRatio:false,
              plugins :{
                legend: { display: false },
              title: {
                display: true,
                text: 'Times each step was visited'
              }
            }}
        });
        this.timePerAgeLoading = false;
        });
    }

    private getHowManyTimesHaveBeenOnStep() {
        this.schedulingAppointmentStatisticsService.getHowManyTimesHaveBeenOnStep().subscribe(res => {
            let ctx = document.getElementById("bar-time-on-step") as HTMLCanvasElement;
            new Chart(ctx, {
              type: 'doughnut',
              data: {
               labels: ['Date Step', 'Speciality Step', 'Doctor Step', 'Time Step', 'Done Step'],
               datasets: [
                {
                    label: "times",
                    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
                    data: [res.dateStep,res.specialityStep,res.doctorStep,res.timeStep,res.finishedStep]
                }
              ]
             },
             options: {
              plugins :{
                legend: { display: true, position: 'bottom' },
              title: {
                display: true,
                text: 'Times each step was visited'
              }
            }}
        });
        this.timeOnStepLoading = false;
        });
    }

    private getAverageTimeOnStep() {
        this.schedulingAppointmentStatisticsService.getAverageTimeOnStep().subscribe(res => {
            let ctx = document.getElementById("bar-avg-on-step") as HTMLCanvasElement;
            new Chart(ctx, {
              type: 'doughnut',
              data: {
               labels: ['Date Step', 'Speciality Step', 'Doctor Step', 'Time Step', 'Done Step'],
               datasets: [
                {
                    label: "seconds",
                    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
                    data: [res.dateStep,res.specialityStep,res.doctorStep,res.timeStep,res.finishedStep]
                }
              ]
             },
             options: {
                maintainAspectRatio:true,
              plugins :{
                legend: { display: true, position: 'bottom' },
              title: {
                display: true,
                text: 'Average TIME spent on step'
              }
            }}
        });
        this.stepAverageLoading = false;
        });
    }
}
