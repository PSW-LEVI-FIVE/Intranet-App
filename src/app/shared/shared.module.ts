import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { LoaderComponent } from './loader/loader.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DoctorMenuComponent } from './doctor-menu/doctor-menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule,RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import { ModalFormComponent } from './modal-form/modal-form.component';


@NgModule({
  declarations: [
    LoaderComponent,
    TemplateFormComponent,
    DoctorMenuComponent,
    ModalFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatMenuModule,
    RouterOutlet,
    MatToolbarModule,
    RouterModule
  ],
  exports: [LoaderComponent, DoctorMenuComponent, TemplateFormComponent]
})
export class SharedModule { }
