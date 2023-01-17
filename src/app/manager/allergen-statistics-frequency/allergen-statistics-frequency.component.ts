import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AllergenStatsService } from './services/allergen-stats.service';

@Component({
  selector: 'app-allergen-statistics-frequency',
  templateUrl: './allergen-statistics-frequency.component.html',
  styleUrls: ['./allergen-statistics-frequency.component.css']
})
export class AllergenStatisticsFrequencyComponent implements OnInit {

  public allergens: string[] = [];
  public numberOfPatients: number[] = [];
  public chart?: Chart;

  constructor(private allergenStatsService: AllergenStatsService) { }

  ngOnInit(): void {
    this.allergenStatsService.getAllergensWithPatients().subscribe(res => {
      res.forEach(allergenWithPats => {
        this.allergens.push(allergenWithPats.allergen);
        this.numberOfPatients.push(allergenWithPats.patients);
      })
      let ctx = document.getElementById("allergen-chart") as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.allergens,
         datasets: [
          {
              backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
              data: this.numberOfPatients
          }
        ]
       },
       options: {
          maintainAspectRatio:false,
          plugins :{
          legend: { display: false },
          title: {
              display: true,
              text: 'Number of patients with allergens'
          }
          }}
        });
    });
  }

}
