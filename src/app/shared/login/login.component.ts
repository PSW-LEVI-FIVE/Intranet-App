import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { Role } from './model/authenticated.model';
import { ILogin } from './model/login.model';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService, private router: Router,
    private readonly toastService: ToastrService
  ) { }

  public login: ILogin = {} as ILogin
  public caughtEmail: string = "";
  public caughtPassword: string = "";

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.loginService.getUserProfile().subscribe(res => {
        if (res == null || !res) return
        if (res.role == Role.DOCTOR) {
          this.router.navigate(["/doctor/appointments"])
        } else if (res.role == Role.MANAGER) {
          this.router.navigate(["/manager"])
        }
      });
    }
  }

  public logIn() {
    this.login.Username = this.caughtEmail;
    this.login.Password = this.caughtPassword;
    this.loginService.login(this.login)
      .pipe(catchError(res => {
        this.toastService.error("Username or password wrong!")
        return EMPTY
      }))
      .subscribe(res => {
        let role = this.enumToRoleString(res.role)
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('role', role);

        if (role == 'Doctor') this.router.navigate(['/doctor/appointments']);
        else if (role == 'Manager') this.router.navigate(['/manager/building-map']);
        else {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      });
  }


  public enumToRoleString(role: Role) {
    if (role == Role.DOCTOR) return "Doctor";
    if (role == Role.MANAGER) return "Manager";
    if (role == Role.SECRETARY) return "Secretary";
    return "Patient";
  }


}
