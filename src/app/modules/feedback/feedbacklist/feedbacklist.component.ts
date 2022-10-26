import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../model/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedbacklist',
  templateUrl: './feedbacklist.component.html',
  styleUrls: ['./feedbacklist.component.css']
})
export class FeedbacklistComponent implements OnInit {

  public dataSource = new MatTableDataSource<FeedBack>();
  public displayedColumns = ['number', 'floor', 'update', 'delete'];
  public feedbacks: FeedBack[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(res => {
      this.feedbacks = res;
      this.dataSource.data = this.feedbacks;
    })
  }

  public chooseFeedback(id: number) {
    this.router.navigate(['/rooms', id]);
  }

  public updateFeedback(id: number) {
    this.router.navigate(['/feedbacks/' + id + '/update']);
  }

  public deleteFeedback(id: number) {
    this.feedbackService.deleteFeedback(id).subscribe(res => {
      this.feedbackService.getFeedbacks().subscribe(res => {
        this.feedbacks = res;
        this.dataSource.data = this.feedbacks;
      })
    })
  }

  public addFeedback() {
    this.router.navigate(['/feedbacks/add']);
  }

}
