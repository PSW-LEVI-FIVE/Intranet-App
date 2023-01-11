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
  public doctors: IDoctor[] = [];
  public dates: string[] = [];
  public appointments: number[] = [];
  filteredOptions: Observable<IDoctor[]> | undefined;
  constructor(private doctorsWorkloadStatisticsService:DoctorWorkloadStatisticsService, private readonly toastService: ToastrService,) { }

  ngOnInit(): void {
    this.doctorsWorkloadStatisticsService.getDoctors().subscribe(res => {
      this.doctors = res;
      this.filteredOptions = of(res);
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
    this.createChart();
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
    this.createChart();
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
    this.createChart();
    });
  }
  createChart() {
    let chartStatus = Chart.getChart("myChart");
    if (chartStatus!= undefined) {
      chartStatus.destroy();
    }
    Chart.defaults.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.3)';
    Chart.defaults.color = 'rgba(0, 0, 0, 1)';
    Chart.defaults.font.size = 30;

    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.dates,
        datasets: [{
          label: "Dates and number of appointments",
          data: this.appointments,
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
              callback: function (value: any) {
                if (Number.isInteger(value)) { return value; } return null;
              },
            },
            beginAtZero: true
          }
        }
      }
    });
    this.dates = [];
    this.appointments = [];
  }

}
