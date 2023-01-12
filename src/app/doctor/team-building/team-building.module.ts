import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamBuildingComponent } from './team-building.component';
import { TeamBuildingCardComponent } from './components/team-building-card/team-building-card.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReasonDialogComponent } from './dialogs/reason-dialog.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TeamBuildingComponent,
    TeamBuildingCardComponent,
    ReasonDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ]
})
export class TeamBuildingModule { }
