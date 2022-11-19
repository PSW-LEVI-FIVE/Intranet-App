import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../model/login.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  makeLogin(login: any): Observable<any> {
    return this.http.post(this.apiHost + 'api/public/login/login', login, {headers: this.headers,responseType:'text'});
  }

  getUserProfile()
  {
    var TokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.apiHost + 'api/public/login/user',{headers:TokenHeader,responseType:'text'});
  }
}
