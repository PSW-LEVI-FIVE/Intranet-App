import { Component, Input, OnInit } from '@angular/core';
import { ITimeInterval } from '../../calendar.component';

@Component({
  selector: 'app-calendar-column',
  templateUrl: './calendar-column.component.html',
  styleUrls: ['./calendar-column.component.css']
})
export class CalendarColumnComponent implements OnInit {

  @Input() public intervals: ITimeInterval[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
