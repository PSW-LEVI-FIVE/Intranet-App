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
import { AnnualLeavesComponent } from './annual-leaves/annual-leaves.component';
import { AnnualLeavesModule } from './annual-leaves/annual-leaves.module';
import { CreateAnnualLeaveComponent } from './annual-leaves/components/create-annual-leave/create-annual-leave.component';
import { ViewAnnualLeavesComponent } from "./annual-leaves/components/view-annual-leaves/view-annual-leaves.component";
import { CreateBloodOrderComponent } from './blood-orders/components/create-blood-order/create-blood-order.component';
import { BloodOrdersModule } from './blood-orders/blood-orders.module';
import { RoleGuard } from '../shared/login/model/role.guard';
import { BrowserModule } from '@angular/platform-browser';
import { HospitalizationComponent } from './hospitalization/hospitalization.component';
import { MedicalRecordViewComponent } from './hospitalization/medical-record-view/medical-record-view.component';
import { HospitalizationModule } from './hospitalization/hospitalization.module';
import { GiveTherapyFormComponent } from './hospitalization/give-therapy-form/give-therapy-form.component';
import { BloodConsumptionModule } from './blood-consumption/blood-consumption.module';
import { BloodConsumptionViewComponent } from './blood-consumption/blood-consumption-view/blood-consumption-view.component';
import { TherapyViewComponent } from './hospitalization/given-therapy-view/therapy-view/therapy-view.component';

const routes = [
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [RoleGuard],
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
        path: 'annual-leaves',
        component: AnnualLeavesComponent,
        children: [
          {
            path: '',
            component: ViewAnnualLeavesComponent
          },
          {
            path: 'create',
            component: CreateAnnualLeaveComponent
          }
        ]
      },
      {
        path: 'blood-orders',
        component: CreateBloodOrderComponent
      },
      {
        path: 'records',
        component: HospitalizationComponent,
        children: [
          {
            path: '',
            component: MedicalRecordViewComponent,

          }
        ]
      },
      {
        path: 'prescribe-therapies/:id',
        component: GiveTherapyFormComponent,
      },
      {
        path: 'blood-consumption',
        component: BloodConsumptionViewComponent,
      },
      {
        path: 'hospitalization-therapies/:id',
        component: TherapyViewComponent,
      },
    ]
  }
]


@NgModule({
  declarations: [
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppointmentsModule,
    AnnualLeavesModule,
    BloodOrdersModule,
    HospitalizationModule,
    RouterModule.forChild(routes),
    SharedModule,
    BloodConsumptionModule,
  ],
  exports: [RouterModule]
})
export class DoctorModule { }
