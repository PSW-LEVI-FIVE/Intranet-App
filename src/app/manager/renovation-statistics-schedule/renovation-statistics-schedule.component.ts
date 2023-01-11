import { Component, OnInit } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

@Component({
  selector: 'app-renovation-statistics-schedule',
  templateUrl: './renovation-statistics-schedule.component.html',
  styleUrls: ['./renovation-statistics-schedule.component.css']
})
export class RenovationStatisticsScheduleComponent implements OnInit {

  constructor() { }

  succUnsuccLoading = true
  public chart?: Chart;

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
    this.createYearReviewChart();
    this.createAverageScheduleDurationChart();
    this.createAverageStepCountChart();

    this.createStepsDurationMergeChart();
    this.createStepsDurationSplitChart();
    this.creatAverageStepMergeChart();
    this.creatAverageStepSplitChart();
  }

  public createYearReviewChart(){
    var ctx = document.getElementById("line-chart") as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "MERGE",
            data: [0,5,7,7,4,8,9,1,2,0,9,4],
            borderColor: "#f5a30a",
            fill: false
          },
          {
            label: "SPLIT",
            data: [10,3,8,4,9,0,0,3,1,3,2,6],
            borderColor: "#1f4d78",
            fill: false
          }
        ]
      },
      options: {
        plugins:
        {
          legend:
          { 
            labels: { font: { size: 20 } }
          },
          title: {
            display: true,
            position: 'top',
            text: 'Amount of successufull renovation in year'
          },
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
  }

  public createAverageScheduleDurationChart(){
    let ctx = document.getElementById("bar-chart-schedule-duration") as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Merge", "Split"],
        datasets: [
          {
            backgroundColor: ["#f5a30a","#1f4d78"],
            data: [2478,5267]
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
  }

  public createStepsDurationMergeChart(){
    let ctx = document.getElementById("bar-chart-merge-steps") as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["1.Basic info", "2. Choose time slot", "3. Additional info", "4. Confirm schedule"],
        datasets: [
          {
            backgroundColor: ["#f5a30a","#1f4d78","#0871a6","#4891b8"],
            //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
            data: [2,3,7,1]
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
  }

  public createStepsDurationSplitChart(){
    let ctx = document.getElementById("bar-chart-split-steps") as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["1.Basic info", "2. Choose time slot", "3. Additional info", "4. Confirm schedule"],
        datasets: [
          {
            backgroundColor: ["#f5a30a","#1f4d78","#0871a6","#4891b8"],
            data: [2,10,6,1]
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
  }

  public creatAverageStepMergeChart(){
    var ctx = document.getElementById("doughnut-chart-merge") as HTMLCanvasElement;
   new Chart(ctx, {
      type: 'doughnut',
    data: {
      labels: ["Started","1.Basic info", "2. Choose time slot", "3. Additional info", "4. Confirm schedule", "Canceled"],
      datasets: [{
        label: "Merge",
        backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
        data: [2,3,7,1,9,2]
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
  }

  public creatAverageStepSplitChart(){
    var ctx = document.getElementById("doughnut-chart-split") as HTMLCanvasElement;
   new Chart(ctx, {
      type: 'doughnut',
    data: {
      labels: ["Started","1.Basic info", "2. Choose time slot", "3. Additional info", "4. Confirm schedule", "Canceled"],
      datasets: [{
        label: "Split",
        backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
        data: [2,3,7,1,9,2]
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
  }

  public createAverageStepCountChart(){
    let ctx = document.getElementById("bar-chart-step-count") as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Merge", "Split"],
        datasets: [
          {
            backgroundColor: ["#f5a30a","#1f4d78"],
            data: [2478,5267, 3762]
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
  }

}
