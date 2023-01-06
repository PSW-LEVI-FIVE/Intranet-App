import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationReportStatisticsComponent } from './examination-report-statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    ExaminationReportStatisticsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    SharedModule
  ]
})
export class ExaminationReportStatisticsModule { }
