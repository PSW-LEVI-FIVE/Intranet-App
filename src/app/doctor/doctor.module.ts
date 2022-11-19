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
import { AnnualLeavesComponent } from './annual-leaves/annual-leaves.component';
import { AnnualLeavesModule } from './annual-leaves/annual-leaves.module';
import { CreateAnnualLeaveComponent } from './annual-leaves/components/create-annual-leave/create-annual-leave.component';

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
      {
        path:'annual-leaves',
        component: AnnualLeavesComponent,
        children: [
          {
            path:'create',
            component: CreateAnnualLeaveComponent
          }
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
    AnnualLeavesModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class DoctorModule { }
