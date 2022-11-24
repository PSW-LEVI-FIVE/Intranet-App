import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NgModule } from '@angular/core';
import { IDoctorWithPopularityDTO } from './model/IDoctorWithPopularityDTO';
import { DcotorStatisticsPopularityService } from './services/dcotor-statistics-popularity.service';
Chart.register(...registerables);

@Component({
  selector: 'app-doctor-statistics-popularity',
  templateUrl: './doctor-statistics-popularity.component.html',
  styleUrls: ['./doctor-statistics-popularity.component.css']
})

export class DoctorStatisticsPopularityComponent implements OnInit {

  public doctors: string[] = [];
  public doctorsPopularities: number[] = [];
  public fromAge: number = 15;
  public toAge: number = 30;
  public chart?: Chart;
  public init: boolean = false;

  constructor(private dcotorStatisticsPopularityService: DcotorStatisticsPopularityService) { }

  public agesFocusOut() {
    if (this.fromAge > 300) this.fromAge = 300;
    if (this.toAge < 0) this.toAge = 0;
    if (this.toAge > 300) this.toAge = 300;
    if (this.fromAge < 0) this.fromAge = 0;
  }

  public createChart() {
    Chart.defaults.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.3)';
    Chart.defaults.color = 'rgba(0, 0, 0, 1)';
    Chart.defaults.font.size = 30;
    this.chart?.destroy();
    var ages: string;
    if (this.init === false) { ages = 'How often does ALL Patients choose certain doctors'; this.init = true; }
    else ages = 'How often does Patients from age ' + this.fromAge + ' to ' + this.toAge + ' choose certain doctors';
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data:
      {
        labels: this.doctors,
        datasets: [{
          label: ages,
          data: this.doctorsPopularities,
          borderWidth: 3,
          backgroundColor: '#5DADEC'
        }]
      },
      options:
      {
        plugins:
        {
          legend:
          {
            labels: { font: { size: 20 } }
          }
        },
        scales:
        {
          y:
          {
            ticks:
            {
              callback: function (value: any) { if (Number.isInteger(value)) { return value; } return null; },
            },
            beginAtZero: true
          }
        }
      }
    });
    this.doctors = [];
    this.doctorsPopularities = [];
  }

  public changeStatistics() {

    this.dcotorStatisticsPopularityService.getDoctorsWithPopularity(this.fromAge, this.toAge).subscribe(res => {
      res.forEach((doctorWithPopularity: IDoctorWithPopularityDTO, index) => {
        this.doctors.push(doctorWithPopularity.id + ' ' + doctorWithPopularity.name + ' ' + doctorWithPopularity.surname);
        this.doctorsPopularities.push(doctorWithPopularity.patientsPicked);
      });
      this.createChart();
    });
  }

  async ngOnInit(): Promise<void> {
    this.fromAge = 0;
    this.toAge = 666;
    this.init = false;
    this.changeStatistics();
    this.fromAge = 15;
    this.toAge = 30;
  }


}
