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
import { CreateFloorComponent } from './create-floor/create-floor.component';
import { CreateMapRoomComponent } from './create-map-room/create-map-room.component';
import { SearchRoomsComponent } from './search-rooms/search-rooms.component';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { NavigationComponent } from './navigation/navigation.component';
import { RoomOverviewComponent } from './room-overview/room-overview.component';
import { EquipmentRelocationOverviewComponent } from './equipment-relocation-overview/equipment-relocation-overview.component';
import { RoomRenovationOverviewComponent } from './room-renovation-overview/room-renovation-overview.component';
import { RoomInformationComponent } from './room-information/room-information.component';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    BuildingMapComponent,
    FloorMapComponent,
    RoomMapComponent,
    CreateBuildingComponent,
    CreateFloorComponent,
    CreateMapRoomComponent,
    SearchRoomsComponent,
    NavigationComponent,
    RoomOverviewComponent,
    EquipmentRelocationOverviewComponent,
    RoomRenovationOverviewComponent,
    RoomInformationComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  entryComponents: [ CreateBuildingComponent ]
})
export class HospitalMapModule { }
