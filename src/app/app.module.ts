import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackModule } from "./manager/feedback/feedback.module";
import { PagesModule } from "./manager/pages/pages.module";
import { DoctorModule } from "./doctor/doctor.module";
import { ManagerModule } from "./manager/manager.module";
import { RoomModule } from "./manager/room/room.module";
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    FeedbackModule,
    DoctorModule,
    ManagerModule,
    RoomModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
