import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";;
import { FeedbacklistComponent } from './feedbacklist/feedbacklist.component';
import { MaterialModule } from "src/app/material/material.module";

const routes: Routes = [
  { path: 'feedbacks', component: FeedbacklistComponent },
];

@NgModule({
  declarations: [
    FeedbacklistComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
    
  ]
})
export class FeedbackModule { }
