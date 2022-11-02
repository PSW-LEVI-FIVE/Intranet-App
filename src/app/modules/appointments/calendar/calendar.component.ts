import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';

export interface ITimeSpan {
  hours: number,
  minutes: number
}

export interface ITimeInterval {
  startsAt: ITimeSpan,
  endsAt: ITimeSpan,
  patient: string
}

export interface IDate {
  intervals: ITimeInterval[],
  date: string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public rows: string[] = []
  public weekIntervals: IDate[] = []
  public selected: Date = new Date()


  constructor(private readonly appointmentService: AppointmentsService) { }

  ngOnInit(): void {
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

  loadAppointments(date: Date) {
    this.appointmentService.getCalendarIntervalsForDate(date).subscribe(res => {
      this.weekIntervals = res
    })
  }


  updateCalendar(date: Date) {
    this.selected = date
    this.loadAppointments(date)
  }

}
