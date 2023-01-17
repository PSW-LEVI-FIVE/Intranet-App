import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IDoctorWithPopularityDTO } from './model/IDoctorWithPopularityDTO';
import { DcotorStatisticsPopularityService } from './services/doctor-statistics-popularity.service';

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

  constructor(private doctorStatisticsPopularityService: DcotorStatisticsPopularityService) { }

  public agesFocusOut() {
    if (this.fromAge > 300) this.fromAge = 300;
    if (this.toAge < 0) this.toAge = 0;
    if (this.toAge > 300) this.toAge = 300;
    if (this.fromAge < 0) this.fromAge = 0;
  }

  public createChart() {
    this.chart?.destroy();
    var ages: string;
    if (this.init === false) { ages = 'How often does ALL Patients choose certain doctors'; this.init = true; }
    else ages = 'How often does Patients from age ' + this.fromAge + ' to ' + this.toAge + ' choose certain doctors';
    let ctx = document.getElementById("doctor-graph") as HTMLCanvasElement;
            this.chart = new Chart(ctx, {
              type: 'bar',
              data: {
               labels: this.doctors,
               datasets: [
                {
                    label: "times",
                    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
                    data: this.doctorsPopularities
                }
              ]
             },
             options: {
                maintainAspectRatio:false,
              plugins :{
                legend: { display: true, position: 'bottom' },
              title: {
                display: true,
                text: 'How many times patients picked doctor'
              }
            }}
        });
    this.doctors = [];
    this.doctorsPopularities = [];
  }

  public changeStatistics() {

    this.doctorStatisticsPopularityService.getDoctorsWithPopularity(this.fromAge, this.toAge).subscribe(res => {
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
