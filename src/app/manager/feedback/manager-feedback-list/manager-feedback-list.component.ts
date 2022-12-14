import { Component, OnInit } from '@angular/core';
import { IFeedback } from '../model/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-feedback-list',
  templateUrl: './manager-feedback-list.component.html',
  styleUrls: ['./manager-feedback-list.component.css']
})
export class ManagerFeedbackListComponent implements OnInit {

  public dataSource = new MatTableDataSource<IFeedback>();
  public displayedColumns = ['Patient', 'Feedback Content', 'Publishing'];
  public feedbacks: IFeedback[] = [];
  public feedbacksChecker: IFeedback[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(res => {
      this.feedbacks = res;
      this.dataSource.data = this.feedbacks.sort((a, b) => 0.5 - Math.random());
      this.feedbacksChecker = JSON.parse(JSON.stringify(this.feedbacks));
    })
  }

  public saveChanges(){
    var statusChangeFeedbacks: IFeedback[] = [];
    var feedbacksChecker = this.feedbacksChecker;
    this.feedbacks.forEach(function (feedbackToPush) {
      var feedbackToCheck = feedbacksChecker.find((feedback: IFeedback) => feedback.id === feedbackToPush.id);
        if(feedbackToPush.feedbackStatus.published !== feedbackToCheck?.feedbackStatus.published){
          statusChangeFeedbacks.push(feedbackToPush)
        }
      });
    this.feedbacksChecker = JSON.parse(JSON.stringify(this.feedbacks));
    statusChangeFeedbacks.forEach( (feedback) => {
      this.feedbackService.updateFeedbackStatus(feedback).subscribe(res => {
        
      });
    });
  }
  public FeedbackStatusChange(feedback: IFeedback){
    feedback.feedbackStatus.published = !feedback.feedbackStatus.published;
  }
}
