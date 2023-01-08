import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticated, Role } from '../login/model/authenticated.model';
import { LoginService } from '../login/service/login.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-doctor-menu',
  templateUrl: './doctor-menu.component.html',
  styleUrls: ['./doctor-menu.component.css']
})
export class DoctorMenuComponent implements OnInit {
  profile: Authenticated = { name: "", surname: '', role: Role.DOCTOR, username: '' }
  burgerState: boolean = true

  constructor(
    private router: Router,
    private readonly loginService: LoginService
  ) { }

  ngOnInit(): void {

    this.loginService.getUserProfile().subscribe(res => {
      this.profile = res
    })
  }

}
