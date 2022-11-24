import { AnnualLeaveComponent } from './annual-leaves/annual-leave.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { AnnualLeaveReviewComponent } from './annual-leave-review/annual-leave-review.component';



@NgModule({
  declarations: [
    AnnualLeaveComponent,
    AnnualLeaveReviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class AnnualLeaveModule { }
