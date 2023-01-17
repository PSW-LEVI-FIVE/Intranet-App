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
      this.createChart();
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
    let ctx = document.getElementById("myChart") as HTMLCanvasElement;
    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: this.months,
        datasets: [
            {
                backgroundColor: ["#b1d0e0"],
                data: this.days,
            }
        ]
        },
        options: {
        plugins :{
            legend: { display: false},
        title: {
            display: true,
            text: 'Months and days taken that month'
        }
        }}
    });
    this.months = [];
    this.days = [];
  }

}
