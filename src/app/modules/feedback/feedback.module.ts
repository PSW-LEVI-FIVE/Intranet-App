import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";;
import { ManagerFeedbackViewComponent } from './managerFeedbackView/managerFeedbackView.component';
import { MaterialModule } from "src/app/material/material.module";

const routes: Routes = [
  { path: 'feedbacks', component: ManagerFeedbackViewComponent },
];

@NgModule({
  declarations: [
    ManagerFeedbackViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
    
  ]
})
export class FeedbackModule { }
