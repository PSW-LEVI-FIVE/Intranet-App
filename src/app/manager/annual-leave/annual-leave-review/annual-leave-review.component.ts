import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IReviewRequest } from '../model/review-leave-request.model';
import { AnnualLeaveService } from '../services/annual-leave.service';

@Component({
  selector: 'app-annual-leave-review',
  templateUrl: './annual-leave-review.component.html',
  styleUrls: ['./annual-leave-review.component.css']
})
export class AnnualLeaveReviewComponent implements OnInit {

  public errorMess:String = 'OK';
  public state: string = "";
  public reason: string = "";
  public id: number = 0;
  constructor(private annualLeaveService:AnnualLeaveService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.id = params['id'];
    });
  }

  reviewRequest(){
    let body: IReviewRequest = {
      state : this.state,
      reason : this.reason
    };
    if(body.state==""){
      this.errorMess="You didn't choose review option";
      return;
    } else {
      this.errorMess = 'OK';
      this.annualLeaveService.reviewAnnualLeave(this.id, body).subscribe(res => {
        alert("Review successfully sent!")
        this.router.navigate(['manager/annual-leave']);
      });
    }
  }

}
