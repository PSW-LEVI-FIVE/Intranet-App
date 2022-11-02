import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointments/appointment.component';
import { DoctorComponent } from './doctor.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';

const routes = [
  {
    path: 'doctor',
    component: DoctorComponent,
    children: [
      {
        path: 'appointments',
        component: AppointmentComponent,
        children: [
          {
            path: 'calendar',
            component: CalendarComponent
          }
        ]
      }
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
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DoctorModule { }
