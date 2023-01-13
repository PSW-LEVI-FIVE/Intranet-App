import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './room/create-room/create-room.component';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';
import { RoomsComponent } from './room/rooms/rooms.component';
import { UpdateRoomComponent } from './room/update-room/update-room.component';
import { RoomModule } from './room/room.module';
import { MaterialModule } from '../material/material.module';
import { RoomComponent } from './room/room.component';
import { ManagerFeedbackListComponent } from './feedback/manager-feedback-list/manager-feedback-list.component';
import { BuildingMapComponent } from './hospital-map/building-map/building-map.component';
import { FloorMapComponent } from './hospital-map/floor-map/floor-map.component';
import { RoomMapComponent } from './hospital-map/room-map/room-map.component';
import { AuthGuard } from '../shared/login/model/auth.guard';
import { DoctorStatisticsPopularityComponent } from './doctor-statistics-popularity/doctor-statistics-popularity.component';
import { AllergenStatisticsFrequencyComponent } from './allergen-statistics-frequency/allergen-statistics-frequency.component';
import { AnnualLeaveComponent } from './annual-leave/annual-leaves/annual-leave.component';
import { AnnualLeaveReviewComponent } from './annual-leave/annual-leave-review/annual-leave-review.component';
import { CreateBuildingComponent } from './hospital-map/create-building/create-building.component';
import { CreateFloorComponent } from './hospital-map/create-floor/create-floor.component';
import { CreateMapRoomComponent } from './hospital-map/create-map-room/create-map-room.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { DoctorStatisticsLeavesComponent } from './doctor-statistics-leaves/doctor-statistics-leaves.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaliciousPatientsComponent } from './malicious-patients/malicious-patients.component';
import { CreateCommercialsComponent } from './create-commercials/create-commercials.component';
import { ExaminationReportStatisticsModule } from './examination-report-statistics/examination-report-statistics.module';
import { ExaminationReportStatisticsComponent } from './examination-report-statistics/examination-report-statistics.component';
import { SharedModule } from "../shared/shared.module";
import { StatisticsComponent } from './statistics/statistics.component';
import { MergeRoomsComponent } from './renovation/merge-rooms/merge-rooms.component';
import { SplitRoomComponent } from './renovation/split-room/split-room.component';
import {RoomOverviewComponent} from './hospital-map/room-overview/room-overview.component'
import { RoomInformationComponent } from './hospital-map/room-information/room-information.component';
import { DoctorStatisticsWorkloadComponent } from './doctor-statistics-workload/doctor-statistics-workload.component';
import { SchedulingAppointmentStatisticsModule } from './scheduling-appointment-statistics/scheduling-appointment-statistics.module';
import { SchedulingAppointmentStatisticsComponent } from './scheduling-appointment-statistics/scheduling-appointment-statistics.component';
import { RenovationStatisticsScheduleComponent } from './renovation-statistics-schedule/renovation-statistics-schedule.component';
import { RenovationStatisticsScheduleModule } from './renovation-statistics-schedule/renovation-statistics-schedule.module';
import { TeamBuildingInvitationsComponent } from './team-building-invitations/team-building-invitations.component';
import { InvitationMenuComponent } from './invitation-menu/invitation-menu.component';
import { InvitationListComponent } from './invitation-list/invitation-list.component';






const routes: Routes = [
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'malicious-patients',
        component: MaliciousPatientsComponent
      },
      {
        path: 'feedback',
        component: ManagerFeedbackListComponent
      },
      {
        path: 'allergen-statistics',
        component: AllergenStatisticsFrequencyComponent
      },
      {
        path: 'doctor-statistics',
        component: DoctorStatisticsPopularityComponent
      },
      

      
      {
        path: 'rooms',
        component: RoomComponent,
        children: [
          { path: '', component: RoomsComponent },
          { path: 'add', component: CreateRoomComponent },
          { path: ':id', component: RoomDetailComponent },
          { path: ':id/update', component: UpdateRoomComponent },
        ]
      },
      {
        path: 'building-map',
        component: BuildingMapComponent
      },
      {
        path: 'floor-map/:id',
        component: FloorMapComponent
      },

      {
        path: 'room-map/:id',
        component: RoomMapComponent
      },

      { 
        path: 'room-map/:id', 
        component: RoomMapComponent ,
        children:[
          {path:'view', component:RoomInformationComponent}
        ]

      },

      {
        path:'room-info/:id/:fid',
        component: RoomInformationComponent
      },
      
      {
        path: 'create-building',
        component: CreateBuildingComponent
      },
      {
        path: 'annual-leave',
        component: AnnualLeaveComponent
      },
      {
        path: 'annual-leave/:id/review',
        component: AnnualLeaveReviewComponent
      },
      {
        path: 'create-floor',
        component: CreateFloorComponent
      },
      {
        path: 'create-room',
        component: CreateMapRoomComponent
      },

      {
        path: 'create-commercials',
        component: CreateCommercialsComponent
      },
      {
        path: 'examination-report-statistics',
        component: ExaminationReportStatisticsComponent
      },
      {
        path: 'scheduling-appointment-statistics',
        component: SchedulingAppointmentStatisticsComponent
      },
      {
        path: 'renovation-statistics-schedule',
        component: RenovationStatisticsScheduleComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent

      },
      {
        path: 'merge-rooms/:floorId',
        component: MergeRoomsComponent
      },
      {
        path: 'split-room/:floorId',
        component: SplitRoomComponent


      },
      {
        path: 'doctors-workload-statistics',
        component: DoctorStatisticsWorkloadComponent
      },



      { 
        path: 'doctors-leave-statistics', 
        component: DoctorStatisticsLeavesComponent
      },

      {
        path:'room-schedule/:id',
        component: RoomOverviewComponent

      },
      {
        path:'invitation',
        component:TeamBuildingInvitationsComponent
      },
      {
        path:'invitation-menu',
        component:InvitationMenuComponent
      },
      {
        path:'invitation-list',
        component:InvitationListComponent
      }
    ]

  }

]

@NgModule({
  declarations: [
    ManagerComponent,
    DoctorStatisticsPopularityComponent,
    AllergenStatisticsFrequencyComponent,
    EquipmentComponent,
    DoctorStatisticsLeavesComponent,
    MaliciousPatientsComponent,
    CreateCommercialsComponent,
    StatisticsComponent,
    MergeRoomsComponent,
    SplitRoomComponent,
    DoctorStatisticsWorkloadComponent,
    RenovationStatisticsScheduleComponent,
    TeamBuildingInvitationsComponent,
    InvitationMenuComponent,
    InvitationListComponent



  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RoomModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ExaminationReportStatisticsModule,
    SchedulingAppointmentStatisticsModule,
    SharedModule
  ]
})
export class ManagerModule { }
