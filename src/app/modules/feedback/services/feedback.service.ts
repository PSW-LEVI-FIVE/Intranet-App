import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFeedBack } from '../model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getFeedbacks(): Observable<IFeedBack[]> {
    return this.http.get<IFeedBack[]>(this.apiHost + 'api/intranet/feedbacks', {headers: this.headers});
  }
  getFeedback(id: number): Observable<IFeedBack> {
    return this.http.get<IFeedBack>(this.apiHost + 'api/intranet/feedbacks/' + id, {headers: this.headers});
  }

  deleteFeedback(id: any): Observable<any> {
    return this.http.delete<any>(this.apiHost + 'api/intranet/feedbacks/' + id, {headers: this.headers});
  }

  createFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/intranet/feedbacks', feedback, {headers: this.headers});
  }

  updateFeedback(feedback: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/feedbacks/' + feedback.id, feedback, {headers: this.headers});
  }

  
}
