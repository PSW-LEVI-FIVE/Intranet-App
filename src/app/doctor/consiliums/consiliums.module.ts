import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsiliumsComponent } from './consiliums.component';
import { CreateConsiliumComponent } from './components/create-consilium/create-consilium.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    ConsiliumsComponent,
    CreateConsiliumComponent
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CommonModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class ConsiliumsModule { }
