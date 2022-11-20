import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalizationComponent } from './hospitalization.component';
import { RouterModule } from '@angular/router';
import { MedicalRecordViewComponent } from './medical-record-view/medical-record-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MedicalRecordHeaderComponent } from './medical-record-view/components/medical-record-header/medical-record-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    HospitalizationComponent,
    MedicalRecordViewComponent,
    MedicalRecordHeaderComponent,
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HospitalizationModule { }
