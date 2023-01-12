import { Component, OnInit } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import { thresholdScott } from 'd3';
import { AvgStepCountDTO } from './dtos/avg-step-count.dto';
import { RenovationStatisticsService } from './services/renovation-statistics.service';

@Component({
  selector: 'app-renovation-statistics-schedule',
  templateUrl: './renovation-statistics-schedule.component.html',
  styleUrls: ['./renovation-statistics-schedule.component.css']
})
export class RenovationStatisticsScheduleComponent implements OnInit {

  constructor(private renovationStatisticsService: RenovationStatisticsService) { }

  public chart?: Chart;
  averageScheduleDurationLoading = true
  averageStepCountLoading = true
  averageStepMergeLoading = true
  averageStepSplitLoading = true
  stepsDurationSplitLoading = true
  stepsDurationMergeLoading = true
  tableLoader = true;
  minTimeMerge: any;
  maxTimeMerge: any;
  avgTimeMerge: any;
  minTimeSplit: any;
  maxTimeSplit: any;
  avgTimeSplit: any;

  succUnsuccOptions: any = {
    plugins: {
      legend: { display: false },
        title: {
          display: true,
          text: 'Average time spent on scheduling'
        }
    }
  }

  ngOnInit(): void {
    this.createTableView();
    this.createAverageScheduleDurationChart();
    this.createAverageStepCountChart();

    this.createStepsDurationMergeChart();
    this.createStepsDurationSplitChart();
    this.creatAverageStepMergeChart();
    this.creatAverageStepSplitChart();
  }

  public createTableView(){
    this.renovationStatisticsService.getMinStepTimeMerge().subscribe(response => {
       this.minTimeMerge = response;
    })
    this.renovationStatisticsService.getMaxStepTimeMerge().subscribe(response => {
      this.maxTimeMerge = response;
    })
    this.renovationStatisticsService.getMinStepTimeSplit().subscribe(response => {
       this.minTimeSplit = response;
    })
    this.renovationStatisticsService.getMaxStepTimeSplit().subscribe(response => {
      this.maxTimeSplit = response;
    })

  }

  public createAverageScheduleDurationChart(){
    this.renovationStatisticsService.getAverageTime().subscribe(response =>{
      let ctx = document.getElementById("bar-chart-schedule-duration") as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
         labels: ["Merge", "Split"],
         datasets: [
          {
            backgroundColor: ["#f5a30a","#1f4d78"],
            data: [response.merge,response.split]
          }
        ]
       },
       options: {
        plugins :{
        legend: { display: false },
        title: {
          display: true,
          text: 'Average TIME spent on scheduling'
        }
      }}
  });
   this.averageScheduleDurationLoading = false
  
    })
  }

  public createStepsDurationMergeChart(){
    this.renovationStatisticsService.getAverageStepTimeMerge().subscribe(response => {
      this.avgTimeMerge = response;
      let ctx = document.getElementById("bar-chart-merge-steps") as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
       type: 'bar',
       data: {
        labels: ["1.Basic info", "2. Choose time slot", "3. Additional info", "4. Confirm schedule"],
        datasets: [
          {
            backgroundColor: ["#f5a30a","#1f4d78","#0871a6","#4891b8"],
            //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
            data: [response.basicInfo,response.timeChosen,response.additionInfo,response.finished]
          }
        ]
       },
       options: {
        plugins :{
        legend: { display: false },
        title: {
          display: true,
          text: 'Average time spent per step for MERGING'
        }
       }}
    });
     this.stepsDurationMergeLoading = false;
    })
  }

  public createStepsDurationSplitChart(){
    this.renovationStatisticsService.getAverageStepTimeSplit().subscribe(response => {
      let ctx = document.getElementById("bar-chart-split-steps") as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["1.Basic info", "2. Choose time slot", "3. Additional info", "4. Confirm schedule"],
          datasets: [
           {
            backgroundColor: ["#f5a30a","#1f4d78","#0871a6","#4891b8"],
            data: [response.basicInfo,response.timeChosen,response.additionInfo,response.finished]
           }
         ]
       },
       options: {
        plugins :{
        legend: { display: false},
        title: {
          display: true,
          text: 'Average time spent per step for SPLITING'
        }
      }}
    });
    this.stepsDurationSplitLoading = false;
   })

  }

  public creatAverageStepMergeChart(){
    this.renovationStatisticsService.getMergeVisitCount().subscribe(response => {
      var ctx = document.getElementById("doughnut-chart-merge") as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
        labels: ["Started","1.Basic info", "2. Choose time slot", "3. Additional info", "4. Confirm schedule", "Canceled"],
        datasets: [{
        label: "Merge",
        backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
        data: [response.start,response.basicInfo,response.timeChosen,response.additionalInfo,response.finished,response.canceled]
      }]
      },
      options: {
        plugins :{
         legend: { display: true, position: 'bottom' },
         title: {
          display: true,
          text: 'Average count of visits per step for MERGING'
        }
       }
      }
     });
     this.averageStepMergeLoading = false;
    })
  }

  public creatAverageStepSplitChart(){
    this.renovationStatisticsService.getSplitVisitCount().subscribe(response => {
      var ctx = document.getElementById("doughnut-chart-split") as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Started","1.Basic info", "2. Choose time slot", "3. Additional info", "4. Confirm schedule", "Canceled"],
          datasets: [{
          label: "Split",
          backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
           data: [response.start,response.basicInfo,response.timeChosen,response.additionalInfo,response.finished,response.canceled]
        }]
       },
        options: {
           plugins :{
             legend: { display: true, position: 'bottom'},
            title: {
             display: true,
             text: 'Average count of visits per step for SPLITING'
        }
      }
     }
    });
      this.averageStepSplitLoading = false;
    })
  }

  public createAverageStepCountChart(){
    this.renovationStatisticsService.getAverageStepCount().subscribe(response=>{
      let ctx = document.getElementById("bar-chart-step-count") as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Merge", "Split"],
        datasets: [
          {
            backgroundColor: ["#f5a30a","#1f4d78"],
            data: [response.merge,response.split]
          }
        ]
      },
      options: {
        plugins :{
        legend: { display: false },
        title: {
          display: true,
          text: 'Average STEPS spent on scheduling'
        }
      }}
  });
      this.averageStepCountLoading = false;
    })
  }

}
