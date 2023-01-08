import { Component, OnInit } from '@angular/core';
import { BloodOrderService } from '../../services/blood-order.service';

export interface IShowBloodOrder {
  doctorFullName: string,
  orderDate: Date | null,
  bloodType: string,
  reason: string | null,
  quantity: number | null,
  position?: number
}

@Component({
  selector: 'app-view-blood-orders',
  templateUrl: './view-blood-orders.component.html',
  styleUrls: ['./view-blood-orders.component.css']
})
export class ViewBloodOrdersComponent implements OnInit {

  public bloodOrders: IShowBloodOrder[] = []
  public columns: string[] = ["No.", "Blood Type", "Quantity", "Date of ordering", "Reason", "Doctor"]
  public counter: number = 1;

  constructor(private readonly bloodOrderService: BloodOrderService) { }

  ngOnInit(): void {
    this.bloodOrderService.getBloodOrders().subscribe(res => {
      this.bloodOrders = res;
      this.assignPosition(this.bloodOrders)
      this.counter = 1;
    })
  }

  format(dt: Date | null) {
    if (dt == null) return ""
    let date = new Date(dt)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  assignPosition(orders: IShowBloodOrder[]) {
    orders.forEach(element => {
      element.position = this.counter;
      this.counter += 1;
    })
  }

}
