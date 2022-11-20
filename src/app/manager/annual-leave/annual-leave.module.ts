import { AnnualLeaveComponent } from './annual-leaves/annual-leave.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { AnnualLeaveReviewComponent } from './annual-leave-review/annual-leave-review.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AnnualLeaveComponent,
    AnnualLeaveReviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class AnnualLeaveModule { }
