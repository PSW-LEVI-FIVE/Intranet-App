import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MedicalRecordViewComponent } from './medical-record-view/medical-record-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MedicalRecordHeaderComponent } from './medical-record-view/components/medical-record-header/medical-record-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import { GiveTherapyFormComponent } from './give-therapy-form/give-therapy-form.component';
import { GiveBloodTherapyComponent } from './give-therapy-form/components/give-blood-therapy/give-blood-therapy.component';
import { GiveMedicineTherapyComponent } from './give-therapy-form/components/give-medicine-therapy/give-medicine-therapy.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TherapyViewComponent } from './given-therapy-view/therapy-view/therapy-view.component';
import { CreateHospitalizationFormComponent } from './medical-record-view/components/create-hospitalization-form/create-hospitalization-form.component';
import { HospitalizationComponent } from './hospitalization.component';




@NgModule({
  declarations: [
    MedicalRecordViewComponent,
    MedicalRecordHeaderComponent,
    CreateHospitalizationFormComponent,
    GiveTherapyFormComponent,
    GiveBloodTherapyComponent,
    GiveMedicineTherapyComponent,
    TherapyViewComponent,
    HospitalizationComponent,
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class HospitalizationModule { }
