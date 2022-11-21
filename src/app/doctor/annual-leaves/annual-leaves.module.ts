import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import { CreateAnnualLeaveComponent } from './components/create-annual-leave/create-annual-leave.component';
import { AnnualLeavesComponent } from './annual-leaves.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ViewAnnualLeavesComponent } from './components/view-annual-leaves/view-annual-leaves.component';

@NgModule({
  declarations: [
    CreateAnnualLeaveComponent,
    AnnualLeavesComponent,
    ViewAnnualLeavesComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    MatCheckboxModule
  ],
  exports: [RouterModule]
})
export class AnnualLeavesModule { }
