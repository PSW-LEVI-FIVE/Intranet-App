import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { AppComponent } from 'src/app/app.component';
import { CalendarColumnComponent } from './calendar/components/calendar-column/calendar-column.component';
import { CalendarIntervalComponent } from './calendar/components/calendar-interval/calendar-interval.component';


const routes: Routes = [
  {
    path: 'appointments',
    component: AppointmentComponent,
    children: [
      {
        path: "calendar",
        component: CalendarComponent
      }
    ]
  },
]


@NgModule({
  declarations: [
    AppointmentComponent,
    CalendarComponent,
    CalendarColumnComponent,
    CalendarIntervalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppointmentsModule { }
