import { Component, OnInit } from '@angular/core';

export interface ITimeInterval {
  startsAt: Date,
  endsAt: Date
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


  constructor() { }

  ngOnInit(): void {
    this.rows = [
      "1:00 AM", "2:00 AM", "3:00 AM",
      "4:00 AM", "5:00 AM", "6:00 AM",
      "7:00 AM", "8:00 AM", "9:00 AM",
      "10:00 AM", "11:00 AM", "12:00 AM",
      "1:00 PM", "2:00 PM", "3:00 PM",
      "4:00 PM", "5:00 PM", "6:00 PM",
      "7:00 PM", "8:00 PM", "9:00 PM",
      "10:00 PM", "11:00 PM", "12:00 PM"
    ]
    let start = new Date()
    start.setHours(0)
    start.setMinutes(30)

    let end = new Date()
    end.setHours(5)
    end.setMinutes(0)


    let startLong = new Date()
    startLong.setHours(3)
    startLong.setMinutes(0)

    let endLong = new Date()
    endLong.setHours(7)
    endLong.setMinutes(0)

    let start2 = new Date()
    start2.setHours(6)
    start2.setMinutes(0)
    let end2 = new Date()
    end2.setHours(10)
    end2.setMinutes(0)

    this.weekIntervals = [
      {
        date: "2021-31-10",
        intervals: [
          {
            startsAt: start,
            endsAt: end
          }
        ],
      },
      {
        date: "2021-31-10",
        intervals: [
          {
            startsAt: startLong,
            endsAt: endLong
          }
        ],
      },
      {
        date: "2021-31-10",
        intervals: [
          {
            startsAt: start,
            endsAt: endLong
          }
        ],
      },
      {
        date: "2021-31-10",
        intervals: [
          {
            startsAt: startLong,
            endsAt: end
          }
        ],
      },
      {
        date: "2021-31-10",
        intervals: [
          {
            startsAt: start,
            endsAt: endLong
          }
        ],
      },
      {
        date: "2021-31-10",
        intervals: [
          {
            startsAt: startLong,
            endsAt: end
          }
        ],
      },
      {
        date: "2021-31-10",
        intervals: [
          {
            startsAt: startLong,
            endsAt: end
          },
          {
            startsAt: start2,
            endsAt: end2
          }
        ],
      }

    ]
  }



}
