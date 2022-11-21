import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-menu',
  templateUrl: './doctor-menu.component.html',
  styleUrls: ['./doctor-menu.component.css']
})
export class DoctorMenuComponent implements OnInit {



  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  onLogout()
  {
    localStorage.removeItem('token');
    this.router.navigate(["/"]);

  }

}
