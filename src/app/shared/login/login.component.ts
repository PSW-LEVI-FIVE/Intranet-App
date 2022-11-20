import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from './model/login.model';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  public login : ILogin = {} as ILogin
  public caughtEmail : string = "";
  public caughtPassword : string = "";

  ngOnInit(): void {
    this.loginService.getUserProfile().subscribe(
      res=>
      {
        console.log(res);
      }
    );
  }

  public makeLogin() {
    this.login.Username = this.caughtEmail;
    this.login.Password = this.caughtPassword;
    console.log(this.login.Username + " " + this.login.Password);
    this.loginService.makeLogin(this.login).subscribe(res => {
      var token = res.split(' ')[0];
      var role = res.split(' ')[1];
      localStorage.setItem('token',token);
      if(role == 'Doctor')this.router.navigate(['/doctor']);
      else if(role == 'Manager')this.router.navigate(['/manager']);
      //this.router.navigate(['/']);
    });
  }


}
