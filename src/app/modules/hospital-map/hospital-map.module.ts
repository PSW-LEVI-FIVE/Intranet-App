import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BuildingMapComponent } from './building-map/building-map.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FloorMapComponent } from './floor-map/floor-map.component';
import { RoomMapComponent } from './room-map/room-map.component';

const routes: Routes = [
  { path: 'building-map', component: BuildingMapComponent },
  { path: 'floor-map/:id', component: FloorMapComponent },
  { path: 'room-map/:id', component: RoomMapComponent },
];

@NgModule({
  declarations: [
    BuildingMapComponent,
    FloorMapComponent,
    RoomMapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class HospitalMapModule { }
