import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenovationStatisticsScheduleComponent } from './renovation-statistics-schedule.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    //RenovationStatisticsScheduleComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    SharedModule
  ]
})
export class RenovationStatisticsScheduleModule { }
