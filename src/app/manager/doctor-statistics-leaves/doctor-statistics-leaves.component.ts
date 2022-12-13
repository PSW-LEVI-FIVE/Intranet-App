import { IStatistic } from './model/statistic.model';
import { DoctorsLeaveStatisticsService } from './services/doctors-leave-statistics.service';
import { IDoctor } from './model/doctor.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of, map, Observable, startWith } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-doctor-statistics-leaves',
  templateUrl: './doctor-statistics-leaves.component.html',
  styleUrls: ['./doctor-statistics-leaves.component.css']
})
export class DoctorStatisticsLeavesComponent implements OnInit {

  myControl = new FormControl<string | IDoctor>('');
  public doctors: IDoctor[] = [];
  public statics: IStatistic[] = [];
  public months: string[] = [];
  public days: number[] = [];
  public inTotal: number = 0;
  filteredOptions: Observable<IDoctor[]> | undefined;
  constructor(private doctorsLeaveStatisticsService:DoctorsLeaveStatisticsService) { }

  ngOnInit(): void {
    this.doctorsLeaveStatisticsService.getDoctors().subscribe(res => {
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
  showStats(selectedDoctor:any){
    this.inTotal = 0;
    this.doctorsLeaveStatisticsService.getStatistics(selectedDoctor.id).subscribe(res => {
      res.forEach(statistics => {
        this.months.push(statistics.month);
        this.days.push(statistics.takenDays);
        this.inTotal += statistics.takenDays;
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
        labels: this.months,
        datasets: [{
          label: "Months and days taken that month",
          data: this.days,
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
    this.months = [];
    this.days = [];
  }

}
