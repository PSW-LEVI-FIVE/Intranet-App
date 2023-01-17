import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateExaminationComponent } from 'src/app/doctor/examination/create-examination-report/create-examination.component';
import { ExaminationReportService } from 'src/app/doctor/examination/services/examination-report.service';
import { ViewFormComponent } from '../../../view-form/view-form.component';
import { ITimeInterval, ITimeSpan } from '../../calendar.component';
import { CalendarDataService } from '../../services/calendar-data.service';

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
    private readonly reportService: ExaminationReportService,
    private readonly dialog: MatDialog,
    private readonly dataUpdater: CalendarDataService
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
    
    const dialogRef = this.dialog.open(ViewFormComponent, {
      data: { id: this.interval.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataUpdater.updateData(5);
    });
    // return this.router.navigate(['doctor/appointments/' + this.interval.id])
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
      if (response == null || response.url == null) {
        const dialogRef = this.dialog.open(CreateExaminationComponent, {
          data: { id: this.interval.id }
        });
    
        dialogRef.afterClosed().subscribe(result => {
        });
      } else {
        window.location.href = response.url;
      }

    })
  }


}
