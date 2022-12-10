import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotFoundError, Observable } from 'rxjs';
import { Authenticated } from '../model/authenticated.model';
import { LoggedIn } from '../model/logged-in.model';
import { ILogin } from '../model/login.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  login(login: any): Observable<any> {
    return this.http.post<LoggedIn>(this.apiHost + 'api/intranet/auth/login', login, { headers: this.headers });
  }

  getUserProfile() {
    var TokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.get<Authenticated>(this.apiHost + 'api/intranet/auth/user', { headers: TokenHeader });
  }
}
