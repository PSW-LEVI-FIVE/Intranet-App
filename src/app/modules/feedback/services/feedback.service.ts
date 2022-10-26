import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedBack } from '../model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiHost: string = 'http://localhost:16177/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getFeedbacks(): Observable<FeedBack[]> {
    return this.http.get<FeedBack[]>(this.apiHost + 'api/feedbacks', {headers: this.headers});
  }
  getFeedback(id: number): Observable<FeedBack> {
    return this.http.get<FeedBack>(this.apiHost + 'api/feedbacks/' + id, {headers: this.headers});
  }

  deleteFeedback(id: any): Observable<any> {
    return this.http.delete<any>(this.apiHost + 'api/feedbacks/' + id, {headers: this.headers});
  }

  createFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/feedbacks', feedback, {headers: this.headers});
  }

  updateFeedback(feedback: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/feedbacks/' + feedback.id, feedback, {headers: this.headers});
  }

  
}
