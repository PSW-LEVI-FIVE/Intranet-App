import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointments/appointment.component';
import { DoctorComponent } from './doctor.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';
import { SharedModule } from '../shared/shared.module';
import { CreateFormComponent } from "./appointments/create-form/create-form.component";
import { ViewFormComponent } from "./appointments/view-form/view-form.component";
import { HospitalizationComponent } from './hospitalization/hospitalization.component';
import { MedicalRecordViewComponent } from './hospitalization/medical-record-view/medical-record-view.component';
import { HospitalizationModule } from './hospitalization/hospitalization.module';

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
            path: '',
            component: CalendarComponent,
          },
          {
            path: 'create',
            component: CreateFormComponent
          },
          {
            path: ':id',
            component: ViewFormComponent
          },
        ]
      },
      {
        path: 'records',
        component: HospitalizationComponent,
        children: [
          {
            path: '',
            component: MedicalRecordViewComponent
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
    HospitalizationModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class DoctorModule { }
