import { DoctorWorkloadStatisticsService } from './services/doctor-workload-statistics.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { Observable, of, startWith } from 'rxjs';
import { IDoctor } from '../doctor-statistics-leaves/model/doctor.model';
import { IWorkloadStatistic } from './model/statistic.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-statistics-workload',
  templateUrl: './doctor-statistics-workload.component.html',
  styleUrls: ['./doctor-statistics-workload.component.css']
})
export class DoctorStatisticsWorkloadComponent implements OnInit {

  myControl = new FormControl<string | IDoctor>('', Validators.required);
  selectedMonth = new FormControl('', Validators.required);
  selectedStart = new FormControl('', Validators.required);
  selectedEnd = new FormControl('', Validators.required);
  selectedTab = 0;
  public doctors: IDoctor[] = [];
  public dates: string[] = [];
  public appointments: number[] = [];
  filteredOptions: Observable<IDoctor[]> | undefined;
  constructor(private doctorsWorkloadStatisticsService:DoctorWorkloadStatisticsService, private readonly toastService: ToastrService,) { }

  ngOnInit(): void {
    this.doctorsWorkloadStatisticsService.getDoctors().subscribe(res => {
      this.doctors = res;
      this.filteredOptions = of(res);
      this.createChart("myChartMonth");
      this.createChart("myChartYear");
      this.createChart("myChartRange");
    });
    this.myControl.valueChanges.pipe(startWith('')).subscribe(value =>
      this.filteredOptions = of(this._filter(value as string)));
  }
  displayFn(doctor: IDoctor): string {
    return doctor ? doctor.id+' '+doctor.name+' '+doctor.surname : '';
  }

  _filter(search: string): IDoctor[] {
    const filterValue = search.toLowerCase().replace(/\s/g, "");
    return this.doctors.filter(option => (
      (option.id.toString()+option.name+option.surname).toLowerCase().includes(filterValue))
    );
  }
  showYearStats(selectedDoctor:any){
    if(this.myControl.status == 'INVALID') {
      this.toastService.error("All fields should be filled!")
      return
    }
    this.doctorsWorkloadStatisticsService.getYearStatistics(selectedDoctor.id).subscribe(res => {
      res.forEach(statistics => {
        this.dates.push(statistics.date);
        this.appointments.push(statistics.numOfAppointments);
      });
    this.createChart("myChartYear");
    });
  }
  showMonthStats(selectedDoctor:any){
    if(this.myControl.status == 'INVALID' || this.selectedMonth.status == 'INVALID') {
      this.toastService.error("All fields should be filled!")
      return
    }
    this.doctorsWorkloadStatisticsService.getMonthStatistics(selectedDoctor.id, this.selectedMonth.value).subscribe(res => {
      res.forEach(statistics => {
        this.dates.push(statistics.date);
        this.appointments.push(statistics.numOfAppointments);
      });
    this.createChart("myChartMonth");
    });
  }
  showRangeStats(selectedDoctor:any){
    if(this.myControl.status == 'INVALID' || this.selectedStart.status == 'INVALID' || this.selectedEnd.status == 'INVALID') {
      this.toastService.error("All fields should be filled!")
      return
    }
    this.doctorsWorkloadStatisticsService.getTimeRangeStatistics(selectedDoctor.id, this.selectedStart.value, this.selectedEnd.value).subscribe(res => {
      res.forEach(statistics => {
        this.dates.push(statistics.date);
        this.appointments.push(statistics.numOfAppointments);
      });
    this.createChart("myChartRange");
    });
  }
  createChart(chartName:string) {
    let chartStatus = Chart.getChart(chartName);
    if (chartStatus!= undefined) {
      chartStatus.destroy();
    }

    
    let ctx = document.getElementById(chartName) as HTMLCanvasElement;
    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: this.dates,
        datasets: [
            {
                backgroundColor: ["#b1d0e0"],
                data: this.appointments,
            }
        ]
        },
        options: {
        plugins :{
            legend: { display: false},
        title: {
            display: true,
            text: 'Dates and number of appointments'
        }
        }}
    });
    this.dates = [];
    this.appointments = [];
  }

}
