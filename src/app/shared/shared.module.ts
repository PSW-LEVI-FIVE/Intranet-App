import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { LoaderComponent } from './loader/loader.component';
import { DoctorMenuComponent } from './doctor-menu/doctor-menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule,Routes,RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";


const routes: Routes = [];

@NgModule({
  declarations: [
    LoaderComponent,
    DoctorMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatMenuModule,
    RouterOutlet,
    MatToolbarModule,
    RouterModule.forRoot(routes)
  ],
  exports: [LoaderComponent, DoctorMenuComponent]
})
export class SharedModule { }
