import { Component, OnInit } from '@angular/core';
import { NgxMatDatetimeContent } from "@angular-material-components/datetime-picker";
import { Time } from "@angular/common";
import { AppointmentsService } from '../services/appointments.service';
import { PatientService } from 'src/app/shared/services/patient-service.service';
import { RoomService } from 'src/app/manager/room/services/room.service';
import { Room } from 'src/app/manager/room/model/room.model';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

export interface ISelectPatient {
  id: number;
  name: string;
  surname: string;
}

export interface ICreateAppointment {
  DoctorId: number;
  PatientId: number | null;
  RoomId: number | null;
  StartAt: Date;
  EndAt: Date;
}


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  public patients: ISelectPatient[] = [];
  public rooms: Room[] = [];
  public doctorId = 2;
  public selectedPatientId = null;
  public selectedRoomId = null;
  public title: string = 'Create Appointment';
  public error: string = '';
  public startDate: Date = new Date()
  public from: string = "";
  public to: string = ""


  constructor(
    private readonly appointmentService: AppointmentsService,
    private readonly patientService: PatientService,
    private readonly roomService: RoomService,
    private readonly toastService: ToastrService,
    private readonly router: Router

  ) { }

  ngOnInit(): void {

    this.patientService.getAll().subscribe(res => {
      this.patients = res
    })

    this.roomService.getRooms().subscribe(res => {
      this.rooms = res;
    })
  }


  convertToDateTime(date: Date, time: string) {
    let chunks = time.split(":")
    let newDate = new Date(date)
    newDate.setHours(+chunks[0], +chunks[1], 0)
    return newDate
  }

  create() {
    if (this.from == '' || this.to == '') {
      this.toastService.error("All fields should be filled!")
      return
    }
    let startTime = this.convertToDateTime(this.startDate, this.from)
    let endTime = this.convertToDateTime(this.startDate, this.to)

    let body: ICreateAppointment = {
      DoctorId: this.doctorId,
      PatientId: this.selectedPatientId,
      RoomId: this.selectedRoomId,
      StartAt: startTime,
      EndAt: endTime
    }

    this.appointmentService.create(body)
      .pipe(catchError(res => {
        const error = res.error
        console.log(error)
        if (error.errors) {
          Object.keys(error.errors).forEach(key => {
            error.errors[key].forEach((err: any) => {
              this.toastService.error(err)
            });
          })
          return EMPTY
        }
        this.toastService.error(error.Message)
        return EMPTY
      }))
      .subscribe(res => {
        this.toastService.success("Successfully added appointment")
        setTimeout(() => {
          this.router.navigate(["doctor/appointments"])
        }, 1000)

      })
  }

}
