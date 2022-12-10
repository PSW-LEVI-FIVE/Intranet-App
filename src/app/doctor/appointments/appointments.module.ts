import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { CalendarColumnComponent } from './calendar/components/calendar-column/calendar-column.component';
import { CalendarIntervalComponent } from './calendar/components/calendar-interval/calendar-interval.component';
import { CalendarHeaderChunkComponent } from './calendar/components/calendar-header-chunk/calendar-header-chunk.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorComponent } from '../doctor.component';
import { CreateFormComponent } from './create-form/create-form.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import { ViewFormComponent } from './view-form/view-form.component';
import { CalendarIntervalEnableComponent } from './calendar/components/calendar-interval-enable/calendar-interval-enable.component';


@NgModule({
  declarations: [
    AppointmentComponent,
    CalendarComponent,
    CalendarColumnComponent,
    CalendarIntervalComponent,
    CalendarHeaderChunkComponent,
    CreateFormComponent,
    ViewFormComponent,
    CalendarIntervalEnableComponent,
  ],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    NgxMatDatetimePickerModule
  ],
  exports: [RouterModule]
})
export class AppointmentsModule { }
