import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-menu',
  templateUrl: './doctor-menu.component.html',
  styleUrls: ['./doctor-menu.component.css']
})
export class DoctorMenuComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    console.log("started")
  }

}
