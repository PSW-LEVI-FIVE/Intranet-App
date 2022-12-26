import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {


  showCalendarWidget: boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  toggleCalendarWidget() {
    this.showCalendarWidget = !this.showCalendarWidget
  }

}
