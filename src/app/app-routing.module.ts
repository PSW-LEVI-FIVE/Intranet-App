import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DoctorComponent } from "./doctor/doctor.component";
import { ManagerComponent } from "./manager/manager.component";
import { HomeComponent } from "./manager/pages/home/home.component";
import { LoginComponent } from "./shared/login/login.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'manager', component: ManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
