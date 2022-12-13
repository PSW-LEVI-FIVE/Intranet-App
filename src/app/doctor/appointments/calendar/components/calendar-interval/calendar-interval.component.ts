import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExaminationReportService } from 'src/app/doctor/examination/services/examination-report.service';
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
    type: 0,
    id: 0
  }
  public startPosition: number = 0;
  public height: number = 0;

  constructor(
    private readonly router: Router,
    private readonly reportService: ExaminationReportService
  ) { }

  ngOnInit(): void {
    this.startPosition = 100 * (this.calculateMinutes(this.interval.startsAt) / 1440)
    this.height = this.calculateMinutes(this.interval.endsAt) - this.calculateMinutes(this.interval.startsAt)
  }

  calculateMinutes(time: ITimeSpan) {
    return time.hours * 60 + time.minutes
  }

  redirectToAppointment() {
    if (this.interval.type == 1)
      return this.isReportDone();
    return this.router.navigate(['doctor/appointments/' + this.interval.id])
  }

  formatDate() {
    const startHours = this.addZeroIfOneNumber(this.interval.startsAt.hours)
    const startMinutes = this.addZeroIfOneNumber(this.interval.startsAt.minutes)
    const endHours = this.addZeroIfOneNumber(this.interval.endsAt.hours)
    const endMinutes = this.addZeroIfOneNumber(this.interval.endsAt.minutes)

    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`
  }

  getColorByType() {
    if (this.interval.type == 0)
      return { background: "#039BE5" }
    if (this.interval.type == 1)
      return { background: "#AD1457" }
    return { background: "#33B679" }
  }


  private addZeroIfOneNumber(num: number) {
    if (num < 10) return "0" + num
    return num + ""
  }

  private isReportDone() {
    this.reportService.getReportByExaminationId(this.interval.id).subscribe(response => {
      if(response == null) {
        this.router.navigate(['doctor/examination/' + this.interval.id + '/report']);
      } else {
        window.location.href = response.url;
      }

    })
  }


}
