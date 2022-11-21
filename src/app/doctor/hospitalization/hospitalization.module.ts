import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalizationComponent } from './hospitalization.component';
import { RouterModule } from '@angular/router';
import { MedicalRecordViewComponent } from './medical-record-view/medical-record-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MedicalRecordHeaderComponent } from './medical-record-view/components/medical-record-header/medical-record-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import { GiveTherapyFormComponent } from './give-therapy-form/give-therapy-form.component';
import { GiveBloodTherapyComponent } from './give-therapy-form/components/give-blood-therapy/give-blood-therapy.component';
import { GiveMedicineTherapyComponent } from './give-therapy-form/components/give-medicine-therapy/give-medicine-therapy.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    HospitalizationComponent,
    MedicalRecordViewComponent,
    MedicalRecordHeaderComponent,
    GiveTherapyFormComponent,
    GiveBloodTherapyComponent,
    GiveMedicineTherapyComponent,
    GiveBloodTherapyComponent,
    GiveMedicineTherapyComponent,
    GiveTherapyFormComponent,

  ],
  exports: [RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class HospitalizationModule { }
