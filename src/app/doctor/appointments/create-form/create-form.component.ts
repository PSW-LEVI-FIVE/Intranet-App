import { Component, OnInit } from '@angular/core';


export interface ISelectPatient{
id:number;
name:string;
surname:string;
}
export interface ISelectRoom{
  id:number;
  roomNumber:string;
}
export interface IAppointment {
patient:ISelectPatient;
room:ISelectRoom;
startAt:string;
endAt:string;
}



@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  public patients:ISelectPatient[]=[];
  public rooms:ISelectRoom[]=[];
  public doctorId='2';
  public selectedPatientId=null;
  public title:string ='Create Appointment';
  public error:string = '';
  public date:Date =new Date();
  public from:string | null = null;
  constructor() { }

  ngOnInit(): void {
    this.patients=[
      {id:1,name:'Luka',surname:'Licina'},
      {id:2,name:'Ognjen',surname:'Svraka'},
      {id:3,name:'Srdjan',surname:'Stepa'},
      {id:4,name:'David',surname:'Djarma'}
    ];
    this.rooms=[
      {id:1,roomNumber:"Room 0"},
      {id:2,roomNumber:"Room 1"},
      {id:3,roomNumber:"Room 2"},
      {id:4,roomNumber:"Room 3"}
    ]
  }

}
