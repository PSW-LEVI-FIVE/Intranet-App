import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodOrdersComponent } from './blood-orders.component';
import { CreateBloodOrderComponent } from './components/create-blood-order/create-blood-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewBloodOrdersComponent } from './components/view-blood-orders/view-blood-orders.component';
import { ViewBloodSuppliesComponent } from './components/view-blood-supplies/view-blood-supplies.component';



@NgModule({
  declarations: [
    CreateBloodOrderComponent,
    ViewBloodOrdersComponent,
    ViewBloodSuppliesComponent
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
export class BloodOrdersModule { }
