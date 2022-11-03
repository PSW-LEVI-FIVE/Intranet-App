import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointments/appointment.component';
import { DoctorComponent } from './doctor.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';
import { SharedModule } from '../shared/shared.module';
import { TemplateFormComponent } from '../shared/template-form/template-form.component';

const routes = [
  {
    path: 'doctor',
    component: DoctorComponent,
    children: [
      {
        path: 'appointments',
        component: CalendarComponent,
        
      },
      {
        path: 'template',
        component: TemplateFormComponent
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
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class DoctorModule { }
