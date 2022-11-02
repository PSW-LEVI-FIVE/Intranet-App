import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITimeInterval, ITimeSpan } from '../../calendar.component';

@Component({
  selector: 'app-calendar-interval',
  templateUrl: './calendar-interval.component.html',
  styleUrls: ['./calendar-interval.component.css']
})
export class CalendarIntervalComponent implements OnInit {

  @Input() public interval: ITimeInterval = {
    startsAt: { hours: 0, minutes: 0 },
    endsAt: { hours: 0, minutes: 0 },
    patient: "",
    id: 0
  }
  public startPosition: number = 0;
  public height: number = 0;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.startPosition = 100 * (this.calculateMinutes(this.interval.startsAt) / 1440)
    this.height = this.calculateMinutes(this.interval.endsAt) - this.calculateMinutes(this.interval.startsAt)
  }

  calculateMinutes(time: ITimeSpan) {
    return time.hours * 60 + time.minutes
  }

  redirectToAppointment() {
    this.router.navigate(['/appointments/' + this.interval.id])
  }

  formatDate() {
    const startHours = this.addZeroIfOneNumber(this.interval.startsAt.hours)
    const startMinutes = this.addZeroIfOneNumber(this.interval.startsAt.minutes)
    const endHours = this.addZeroIfOneNumber(this.interval.endsAt.hours)
    const endMinutes = this.addZeroIfOneNumber(this.interval.endsAt.minutes)

    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`
  }

  private addZeroIfOneNumber(num: number) {
    if (num < 10) return "0" + num
    return num + ""
  }

}
