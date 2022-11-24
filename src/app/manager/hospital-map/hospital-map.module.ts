import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BuildingMapComponent } from './building-map/building-map.component';
import { FloorMapComponent } from './floor-map/floor-map.component';
import { RoomMapComponent } from './room-map/room-map.component';
import { MaterialModule } from 'src/app/material/material.module';
import {MatButtonModule} from '@angular/material/button';
import { CreateBuildingComponent } from './create-building/create-building.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BuildingMapComponent,
    FloorMapComponent,
    RoomMapComponent,
    CreateBuildingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatButtonModule,
    FormsModule
  ]
})
export class HospitalMapModule { }
