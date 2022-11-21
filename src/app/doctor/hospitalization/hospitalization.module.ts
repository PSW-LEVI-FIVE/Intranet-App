import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalizationComponent } from './hospitalization.component';
import { RouterModule } from '@angular/router';
import { MedicalRecordViewComponent } from './medical-record-view/medical-record-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MedicalRecordHeaderComponent } from './medical-record-view/components/medical-record-header/medical-record-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import { CreateHospitalizationFormComponent } from './medical-record-view/components/create-hospitalization-form/create-hospitalization-form.component';



@NgModule({
  declarations: [
    HospitalizationComponent,
    MedicalRecordViewComponent,
    MedicalRecordHeaderComponent,
    CreateHospitalizationFormComponent,
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class HospitalizationModule { }
