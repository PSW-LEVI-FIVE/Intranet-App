import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentsService} from "../services/appointments.service";
import {ICreateAppointment} from "../create-form/create-form.component";

export interface IUpdateAppointment{
  Start:Date;
  End:Date;
}

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {

  public title:string ='View Appointment';
  public error:string = '';
  public roomName:string='';
  public patientName:string='';
  public startDate: Date = new Date()
  public from: string='';
  public to:string='';
  public newStartDate: Date = new Date()
  public newFrom:string='';
  public newTo:string='';
  public btnText: string = "Close" ;
  public btnLocked: boolean=false;
  public isEditFrom:boolean = false;
  public isEditTo:boolean = false;
  constructor(private route: ActivatedRoute,
              private appointmentService:AppointmentsService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.getAppointment();
  }

  getAppointment():void{
    const id=Number(this.route.snapshot.paramMap.get('id'))
    this.appointmentService.getAppointmentById(id)
      .subscribe(appointment=>{
        this.fillAppointmentInfo(appointment)
      });
  }

  fillAppointmentInfo(appointment:any){
    this.roomName=appointment.room.roomNumber
    this.patientName=appointment.patient.name +' '+ appointment.patient.surname
    this.startDate=new Date(appointment.startAt)
    let endDate = new Date(appointment.endAt)
    this.from= this.startDate.getHours().toString()+':'+this.startDate.getMinutes().toString();
    this.to= endDate.getHours().toString()+':'+endDate.getMinutes().toString();
    this.newFrom= this.startDate.getHours().toString()+':'+this.startDate.getMinutes().toString();
    this.newTo=   endDate.getHours().toString()+':'+endDate.getMinutes().toString();
    this.newStartDate=new Date(appointment.startAt)
  }

  convertToDateTime(date: Date, time: string) {
    let chunks = time.split(":")
    let newDate = new Date(date)
    newDate.setHours(+chunks[0], +chunks[1], 0)
    return newDate
  }

  cancelAppointment(){
    let id=Number(this.route.snapshot.paramMap.get('id'))
    this.appointmentService.cancelAppointmentById(id);
  }
  update(){
    let startDate=this.convertToDateTime(this.newStartDate,this.newFrom)
    let endDate=this.convertToDateTime(this.newStartDate,this.newTo)
    let id=Number(this.route.snapshot.paramMap.get('id'))
    let body:IUpdateAppointment={
      Start:startDate,
      End:endDate,
    }
    this.appointmentService.updateAppointment(body,id);
  }

  editFrom(){
    this.isEditFrom=!this.isEditFrom
    if(this.isEditFrom || this.isEditTo){
        this.btnLocked=true;
        this.btnText = "Close"
    }else{
      this.btnLocked=false;
      this.btnText= "UPDATE"
    }
  }
  editTo(){
    this.isEditTo=!this.isEditTo
    if(this.isEditFrom || this.isEditTo){
      this.btnLocked=true;
      this.btnText = "Close"
    }else{
      this.btnLocked=false;
      this.btnText= "UPDATE"
    }
  }

  close(){

  }

}
