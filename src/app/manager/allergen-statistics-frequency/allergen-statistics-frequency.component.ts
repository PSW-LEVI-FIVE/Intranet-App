import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { IAllergenWithPatients } from './model/IAllergenWithPatients';
import { AllergenStatsService } from './services/allergen-stats.service';

@Component({
  selector: 'app-allergen-statistics-frequency',
  templateUrl: './allergen-statistics-frequency.component.html',
  styleUrls: ['./allergen-statistics-frequency.component.css']
})
export class AllergenStatisticsFrequencyComponent implements OnInit {

  public allergensWithPatients: IAllergenWithPatients[] = [];
  public allergens: string[] = [];
  public numberOfPatients: number[] = [];

  constructor(private allergenStatsService: AllergenStatsService) { }

  public createChart(){
    Chart.defaults.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.3)';
    Chart.defaults.color = 'rgba(0, 0, 0, 1)';
    Chart.defaults.font.size = 30;

    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myChart = new Chart(ctx,{
      type: 'bar',
    data: {
      labels: this.allergens,
      datasets: [{
        label: "Allergens and number of patients that are alergic to them",
        data: this.numberOfPatients,
        borderWidth: 3,
        backgroundColor: '#5DADEC'
      }]
    },
    options: {
      plugins: {
        legend: {
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 20
                }
            }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function (value) { if (Number.isInteger(value)) { return value; } return null;},
          },
          beginAtZero: true
        }
      }
    }
    });
  }

  ngOnInit(): void {
    this.allergenStatsService.getAllergensWithPatients().subscribe(res =>{
      this.allergensWithPatients = res;
      console.log(res);
      this.allergensWithPatients.forEach( allergenWithPats => {
        this.allergens.push(allergenWithPats.allergen);
        this.numberOfPatients.push(allergenWithPats.patients);
      })
      this.createChart();
    });
  }

}
