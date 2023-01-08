import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloodConsumption } from '../model/blood-consumption.model';
import { BloodConsumptionService } from '../services/blood-consumption.service';

@Component({
  selector: 'app-blood-consumption-view',
  templateUrl: './blood-consumption-view.component.html',
  styleUrls: ['./blood-consumption-view.component.css']
})
export class BloodConsumptionViewComponent implements OnInit {

  public bloodConsumptions: BloodConsumption[] = []
  public columns: string[] = ["No.", "Blood Type", "Quantity", "Date of prescribing", "Doctor"]
  public counter: number = 1;

  constructor(private readonly bloodConsumptionService: BloodConsumptionService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.bloodConsumptionService.getBloodConsumption().subscribe(res => {
      this.bloodConsumptions = res;
      this.giveNameByType(this.bloodConsumptions);
      this.assignPosition(this.bloodConsumptions)
      this.counter = 1;
    })
  }

  giveNameByType(blood: BloodConsumption[]) { //ovde za krv po tipu da se ispise
    blood.forEach(element => {
      if (element.typeBlood == 0)
        element.bloodName = "A positive";
      else if (element.typeBlood == 1)
        element.bloodName = "A negative";
      else if (element.typeBlood == 2)
        element.bloodName = "B positive";
      else if (element.typeBlood == 3)
        element.bloodName = "B negative";
      else if (element.typeBlood == 4)
        element.bloodName = "AB positive";
      else if (element.typeBlood == 5)
        element.bloodName = "AB negative";
      else if (element.typeBlood == 6)
        element.bloodName = "0 positive";
      else
        element.bloodName = "0 negative";
    });
  }

  format(dt: Date | null) {
    if (dt == null) return ""
    let date = new Date(dt)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  assignPosition(blood: BloodConsumption[]) {
    blood.forEach(element => {
      element.position = this.counter;
      this.counter += 1;
    })
  }
}
