import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "src/app/material/material.module";
import { ManagerFeedbackListComponent } from './manager-feedback-list/manager-feedback-list.component';

@NgModule({
  declarations: [
    ManagerFeedbackListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule

  ]
})
export class FeedbackModule { }
