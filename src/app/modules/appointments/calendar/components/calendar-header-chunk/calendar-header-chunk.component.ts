import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-header-chunk',
  templateUrl: './calendar-header-chunk.component.html',
  styleUrls: ['./calendar-header-chunk.component.css']
})
export class CalendarHeaderChunkComponent implements OnInit {


  @Input() public date: string = ""
  public isToday: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let date = new Date(this.date)
    let today = new Date()
    date.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    this.isToday = date.getTime() === today.getTime()
  }

  getDateNumber() {
    let dt = new Date(this.date)
    return dt.getDate()
  }

  getDayOfTheWeek() {
    let dt = new Date(this.date)
    let day = dt.getDay()

    if (day == 1) return "MON"
    if (day == 2) return "TUE"
    if (day == 3) return "WEN"
    if (day == 4) return "THU"
    if (day == 5) return "FRI"
    if (day == 6) return "SAT"
    return "SUN"
  }

}
