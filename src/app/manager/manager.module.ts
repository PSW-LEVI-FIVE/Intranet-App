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
import { RoomComponent } from './room/room.component';
import { ManagerFeedbackListComponent } from './feedback/manager-feedback-list/manager-feedback-list.component';
import { BuildingMapComponent } from './hospital-map/building-map/building-map.component';
import { FloorMapComponent } from './hospital-map/floor-map/floor-map.component';
import { RoomMapComponent } from './hospital-map/room-map/room-map.component';
import { AuthGuard } from '../shared/login/model/auth.guard';
import { DoctorStatisticsPopularityComponent } from './doctor-statistics-popularity/doctor-statistics-popularity.component';


const routes: Routes = [
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'feedback',
        component: ManagerFeedbackListComponent
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
    ]

  }

]

@NgModule({
  declarations: [
    ManagerComponent,
    DoctorStatisticsPopularityComponent
  ],
  imports: [
    CommonModule,
    RoomModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerModule { }
