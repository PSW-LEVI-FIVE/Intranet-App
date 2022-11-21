import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalizationComponent } from './hospitalization.component';
import { RouterModule } from '@angular/router';
import { MedicalRecordViewComponent } from './medical-record-view/medical-record-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MedicalRecordHeaderComponent } from './medical-record-view/components/medical-record-header/medical-record-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
<<<<<<< HEAD
import { CreateHospitalizationFormComponent } from './medical-record-view/components/create-hospitalization-form/create-hospitalization-form.component';
import { GiveTherapyFormComponent } from './give-therapy-form/give-therapy-form.component';
import { GiveBloodTherapyComponent } from './give-therapy-form/components/give-blood-therapy/give-blood-therapy.component';
import { GiveMedicineTherapyComponent } from './give-therapy-form/components/give-medicine-therapy/give-medicine-therapy.component';
=======
import { GiveTherapyFormComponent } from './give-therapy-form/give-therapy-form.component';
import { GiveBloodTherapyComponent } from './give-therapy-form/components/give-blood-therapy/give-blood-therapy.component';
import { GiveMedicineTherapyComponent } from './give-therapy-form/components/give-medicine-therapy/give-medicine-therapy.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
>>>>>>> prescribing therapy form made



@NgModule({
  declarations: [
    HospitalizationComponent,
    MedicalRecordViewComponent,
    MedicalRecordHeaderComponent,
<<<<<<< HEAD
    CreateHospitalizationFormComponent,
=======
>>>>>>> prescribing therapy form made
    GiveTherapyFormComponent,
    GiveBloodTherapyComponent,
    GiveMedicineTherapyComponent,
    GiveBloodTherapyComponent,
    GiveMedicineTherapyComponent,
    GiveTherapyFormComponent,
<<<<<<< HEAD
=======

>>>>>>> prescribing therapy form made
  ],
  exports: [RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    FormsModule,
    SharedModule,
=======
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
>>>>>>> prescribing therapy form made
  ]
})
export class HospitalizationModule { }
