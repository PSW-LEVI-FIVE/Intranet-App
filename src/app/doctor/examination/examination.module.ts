import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateExaminationComponent } from './create-examination-report/create-examination.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportOverviewComponent } from './components/report-overview/report-overview.component';



@NgModule({
  declarations: [
    CreateExaminationComponent,
    ReportOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExaminationModule { }
