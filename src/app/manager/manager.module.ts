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
import {ReactiveFormsModule} from '@angular/forms';
import { MaliciousPatientsComponent } from './malicious-patients/malicious-patients.component';
import { CreateCommercialsComponent } from './create-commercials/create-commercials.component';


const routes: Routes = [
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate:[AuthGuard],
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
        path: 'doctors-leave-statistics', 
        component: DoctorStatisticsLeavesComponent
      },
      { 
        path: 'create-commercials', 
        component: CreateCommercialsComponent
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
    CreateCommercialsComponent
  ],
  imports: [
    CommonModule,
    RoomModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerModule { }
