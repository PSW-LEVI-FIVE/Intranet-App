import { Component, Input, OnInit } from '@angular/core';
import { ITimeInterval } from '../../calendar.component';

@Component({
  selector: 'app-calendar-interval',
  templateUrl: './calendar-interval.component.html',
  styleUrls: ['./calendar-interval.component.css']
})
export class CalendarIntervalComponent implements OnInit {

  @Input() public interval: ITimeInterval = {
    startsAt: new Date(),
    endsAt: new Date()
  }
  public startPosition: number = 0;
  public height: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startPosition = 100 * (this.calculateMinutes(this.interval.startsAt) / 1440)
    this.height = this.calculateMinutes(this.interval.endsAt) - this.calculateMinutes(this.interval.startsAt)
  }



  calculateMinutes(date: Date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return hours * 60 + minutes
  }

}
