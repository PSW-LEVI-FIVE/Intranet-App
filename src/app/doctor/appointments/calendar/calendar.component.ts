import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, subscribeOn, Subscription } from 'rxjs';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AppointmentsService } from '../services/appointments.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateFormComponent } from '../create-form/create-form.component';
import { CreateConsiliumComponent } from '../../consiliums/components/create-consilium/create-consilium.component';

export interface ITimeSpan {
  hours: number,
  minutes: number
}

export interface ITimeInterval {
  startsAt: ITimeSpan,
  endsAt: ITimeSpan,
  patient?: string,
  type: number,
  id: number
}

export interface IDate {
  intervals: ITimeInterval[],
  date: string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '50%',
        display: 'block',
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
        display: 'none',
        width: '100%'
      })),
      transition('open => closed', animate('600ms 0.4ms ease-in-out')),
      transition('closed => open', animate('600ms 0.4ms ease-in-out'))
    ]),
  ],
})
export class CalendarComponent implements OnInit {

  public rows: string[] = []
  public weekIntervals: IDate[] = []
  public selected: Date = new Date()
  public isLoading: boolean = false
  public appointmentsShown = [true, true, true]
  public showCalendarWidget = true
  private burgerSub: Subscription = new Subscription()


  constructor(
    private readonly appointmentService: AppointmentsService,
    private readonly router: Router,
    private readonly menuService: MenuService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.burgerSub = this.menuService.getBurgerState().subscribe(val => {
      this.showCalendarWidget = val
    })
    this.rows = [
      "0:00 AM", "1:00 AM", "2:00 AM", "3:00 AM",
      "4:00 AM", "5:00 AM", "6:00 AM",
      "7:00 AM", "8:00 AM", "9:00 AM",
      "10:00 AM", "11:00 AM", "12:00 PM",
      "1:00 PM", "2:00 PM", "3:00 PM",
      "4:00 PM", "5:00 PM", "6:00 PM",
      "7:00 PM", "8:00 PM", "9:00 PM",
      "10:00 PM", "11:00 PM"
    ]

    this.loadAppointments(this.selected)

  }
  
  createAppointment() {
    const dialogRef = this.dialog.open(CreateFormComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAppointments(this.selected)
    });
  }

  createConsilium() {
    const dialogRef = this.dialog.open(CreateConsiliumComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  loadAppointments(date: Date) {
    this.isLoading = true
    this.appointmentService.getCalendarIntervalsForDate(date)
      .pipe(catchError(res => {
        this.isLoading = false;
        return EMPTY
      }))
      .subscribe(res => {
        this.weekIntervals = res
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      })
  }

  updateCalendar(date: Date) {
    this.selected = date
    this.loadAppointments(date)
  }

  updateAppointmentsShown(values: boolean[]) {
    console.log(values)
    this.appointmentsShown = values
  }

  navigate(route: string) {
    this.router.navigate([route])
  }

  ngOnDestroy() {
    this.burgerSub.unsubscribe();
  }

}
