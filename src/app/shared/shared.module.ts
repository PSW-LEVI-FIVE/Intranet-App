import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { LoaderComponent } from './loader/loader.component';
import { TemplateFormComponent } from './template-form/template-form.component';



@NgModule({
  declarations: [
    LoaderComponent,
    TemplateFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [LoaderComponent, TemplateFormComponent]
})
export class SharedModule { }
