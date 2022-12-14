import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFeedback } from '../model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

    apiHost: string = 'http://localhost:5000/';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    getFeedbacks(): Observable<IFeedback[]> {
    return this.http.get<IFeedback[]>(this.apiHost + 'api/intranet/feedbacks/manager', {headers: this.headers});
    }

    updateFeedbackStatus(feedback: IFeedback): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/feedbacks/' + feedback.id, {headers: this.headers});
    }
}
