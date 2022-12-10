import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-interval-enable',
  templateUrl: './calendar-interval-enable.component.html',
  styleUrls: ['./calendar-interval-enable.component.css']
})
export class CalendarIntervalEnableComponent implements OnInit {

  public regular: boolean = true
  public examination: boolean = true
  public consilium: boolean = true

  @Output() toggleInterval = new EventEmitter<Array<boolean>>();
  constructor() { }

  ngOnInit(): void {
  }


  updateRegular(val: boolean) {
    this.regular = val
  }


  updateExamination(val: boolean) {
    this.examination = val
  }

  updateConsilium(val: boolean) {
    this.consilium = val
  }

  updated() {
    this.toggleInterval.emit([this.regular, this.examination, this.consilium])
  }




}
