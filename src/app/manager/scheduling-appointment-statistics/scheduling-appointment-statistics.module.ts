import { MaterialModule } from 'src/app/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingAppointmentStatisticsComponent } from './scheduling-appointment-statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms'



@NgModule({
    declarations: [
        SchedulingAppointmentStatisticsComponent
    ],
    imports: [
        CommonModule,
        NgChartsModule,
        SharedModule,
        FormsModule,
        MaterialModule
    ]
})
export class SchedulingAppointmentStatisticsModule { }
