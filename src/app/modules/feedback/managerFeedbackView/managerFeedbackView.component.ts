import { Component, OnInit } from '@angular/core';
import { IFeedBack } from '../model/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managerFeedbackView',
  templateUrl: './managerFeedbackView.component.html',
  styleUrls: ['./managerFeedbackView.component.css']
})
export class ManagerFeedbackViewComponent implements OnInit {

  public dataSource = new MatTableDataSource<IFeedBack>();
  public displayedColumns = ['Patient', 'Feedback Content', 'Publishing'];
  public feedbacks: IFeedBack[] = [];
  public feedbacksChecker: IFeedBack[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(res => {
      this.feedbacks = res;
      this.feedbacksChecker = JSON.parse(JSON.stringify(this.feedbacks));
      this.dataSource.data = this.feedbacks.sort((a, b) => 0.5 - Math.random());
    })
  }

  public chooseFeedback(id: number) {
    this.router.navigate(['/feedbacks', id]);
  }

  public saveChanges(){
    var publishChangingFeedbacks: IFeedBack[] = [];
    var feedbacksChecker = this.feedbacksChecker;
    this.feedbacks.forEach(function (feedbackToPush) {
      var feedbackToCheck = feedbacksChecker.find((feedback: IFeedBack) => feedback.id === feedbackToPush.id);
        if((feedbackToPush.id === feedbackToCheck?.id) && (feedbackToPush.published !== feedbackToCheck?.published)){
          publishChangingFeedbacks.push(feedbackToPush)
        }
      });
    publishChangingFeedbacks.forEach( (feedback) => {
      this.feedbackService.updateFeedbackStatus(feedback).subscribe(res => {
        this.router.navigate(['/feedbacks']);
      });
    });
  }
  public FeedbackStatusChange(feedback: IFeedBack){
    feedback.published = !feedback.published;
  }


}
