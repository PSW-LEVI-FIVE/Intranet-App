import { Component, OnInit } from '@angular/core';
import { BloodOrderService } from '../../services/blood-order.service';

export type IBlood = {
  bloodType: string;
  quantity: string;
  position?: number;
};

@Component({
  selector: 'app-view-blood-supplies',
  templateUrl: './view-blood-supplies.component.html',
  styleUrls: ['./view-blood-supplies.component.css']
})
export class ViewBloodSuppliesComponent implements OnInit {

  public bloodTypes: IBlood[] = []
  public columns: string[] = ["No.", "Blood Type", "Quantity"]
  public counter: number = 1;

  constructor(private readonly bloodOrderService: BloodOrderService) { }

  ngOnInit(): void {
    this.bloodOrderService.getBloodSupply().subscribe(res => {
      this.bloodTypes = res;
      this.assignPosition(this.bloodTypes)
      this.counter = 1;
    })
  }

  assignPosition(orders: IBlood[]) {
    orders.forEach(element => {
      element.position = this.counter;
      this.counter += 1;
    })
  }

}
