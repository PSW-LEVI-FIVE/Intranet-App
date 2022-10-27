import { Component, OnInit } from '@angular/core';
import { IFeedBack } from '../model/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedbacklist',
  templateUrl: './feedbacklist.component.html',
  styleUrls: ['./feedbacklist.component.css']
})
export class FeedbacklistComponent implements OnInit {

  public dataSource = new MatTableDataSource<IFeedBack>();
  public displayedColumns = ['number', 'floor', 'publishing'];
  public feedbacks: IFeedBack[] = [];
  public publishChangingFeedbacks: IFeedBack[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(res => {
      this.feedbacks = res;
      this.dataSource.data = this.feedbacks.reverse();
    })
  }

  public chooseFeedback(id: number) {
    this.router.navigate(['/feedbacks', id]);
  }

  public addFeedbackToChange(addfeedback: IFeedBack){
    var alreadyIn : boolean = false;
    var index : number = -1;

    this.publishChangingFeedbacks.forEach( (feedbackFor,indexFor) => {
      if(feedbackFor.id === addfeedback.id) {
        alreadyIn = true;
        index = indexFor;
        return;
      }
    });

    if(alreadyIn)
    this.publishChangingFeedbacks.splice(index,1);
    else
    this.publishChangingFeedbacks.push(addfeedback);
  }


}
