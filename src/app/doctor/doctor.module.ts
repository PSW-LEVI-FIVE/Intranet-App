import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointments/appointment.component';
import { DoctorComponent } from './doctor.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';
import { SharedModule } from '../shared/shared.module';
import {CreateFormComponent} from "./appointments/create-form/create-form.component";
import {ViewFormComponent} from "./appointments/view-form/view-form.component";

const routes = [
  {
    path: 'doctor',
    component: DoctorComponent,
    children: [
      {
        path:'appointments',
        component: AppointmentComponent,
        children: [
          {
            path: '',
            component: CalendarComponent,
          },
          {
            path:'create',
            component: CreateFormComponent
          },
          {
            path:':id',
            component: ViewFormComponent
          },
        ]
      },

    ]
  }
]


@NgModule({
  declarations: [
    DoctorComponent
  ],
  imports: [
    CommonModule,
    AppointmentsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class DoctorModule { }
