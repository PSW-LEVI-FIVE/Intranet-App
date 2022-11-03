import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentsService} from "../services/appointments.service";
import {ICreateAppointment} from "../create-form/create-form.component";

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {

  public title:string ='Update Appointment';
  public error:string = '';
  public roomName:string='';
  public patientName:string='';
  public startAt='';
  public endAt='';
  constructor(private route: ActivatedRoute,
              private appointmentService:AppointmentsService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.getAppointment();
  }

  getAppointment():void{
    const id=Number(this.route.snapshot.paramMap.get('id'))
    this.appointmentService.getAppointmentById(id)
  }

}
