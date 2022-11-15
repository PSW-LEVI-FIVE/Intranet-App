import { NgModule } from '@angular/core';
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
import { MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomAllocationFormComponent } from '../manager/room-allocation-form/room-allocation-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import { MaterialModule } from '../material/material.module';





const routes: Routes = [
  {
    path: 'manager',
    component: ManagerComponent,
    children: [
      {
        path: 'feedback',
        component: ManagerFeedbackListComponent
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
        path: 'room-alocation',
        component: RoomAllocationFormComponent
      },
    ]

  }

]

@NgModule({
  declarations: [
    ManagerComponent,
    RoomAllocationFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatInputModule,
    RoomModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerModule { }
