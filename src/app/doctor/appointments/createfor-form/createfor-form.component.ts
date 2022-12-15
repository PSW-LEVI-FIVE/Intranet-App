import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { Room } from 'src/app/manager/room/model/room.model';
import { RoomService } from 'src/app/manager/room/services/room.service';
import { PatientService } from 'src/app/shared/services/patient-service.service';
import { IDate } from '../calendar/calendar.component';
import { AppointmentsService } from '../services/appointments.service';
import { DoctorService } from '../services/doctors.service';

export interface ISelectPatientFor {
  id: number;
  name: string;
  surname: string;
}

export interface ICreateAppointmentFor {
  DoctorId: number | null;
  PatientId: number | null;
  RoomId: number | null;
  StartAt: Date;
  EndAt: Date;
}

export interface ISpecialityDTO {
  id: number;
  name: string;
}

export interface IDoctorDTO {
  id: number;
  name: string;
  surname: string;
  specialityId: number;
}

export interface IGetAppointmentsInRange {
  id: number | null;
  desiredDate: Date;
}

@Component({
  selector: 'app-createfor-form',
  templateUrl: './createfor-form.component.html',
  styleUrls: ['./createfor-form.component.css']
})
export class CreateforFormComponent implements OnInit {
  public patients: ISelectPatientFor[] = [];
  public rooms: Room[] = [];
  public selectedPatientId = null;
  public selectedRoomId = -1;
  public title: string = 'Create Appointment';
  public error: string = '';
  public startDate: Date = new Date();
  public from: string = "";
  public to: string = "";
  public appointments = [];

  public specialities: ISpecialityDTO[] = [];
  public doctors: IDoctorDTO[] = [];
  public doctorId = new FormControl(-1);
  public specialityId = new FormControl(-1);

  public rows: string[] = []
  public weekIntervals: IDate[] = []
  public desiredDate: Date = new Date();
  public isLoading: boolean = false

  constructor(
    private readonly appointmentService: AppointmentsService,
    private readonly patientService: PatientService,
    private readonly roomService: RoomService,
    private readonly doctorService: DoctorService,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.patientService.getAll().subscribe(res => {
      this.patients = res
    })

    this.roomService.getRooms().subscribe(res => {
      this.rooms = res;
    })

    this.doctorService.getAllSpecialities()
      .subscribe(result => {
        this.specialities = result;
      })

    this.rows = [
      "0:00 AM", "1:00 AM", "2:00 AM", "3:00 AM",
      "4:00 AM", "5:00 AM", "6:00 AM",
      "7:00 AM", "8:00 AM", "9:00 AM",
      "10:00 AM", "11:00 AM", "12:00 PM",
      "1:00 PM", "2:00 PM", "3:00 PM",
      "4:00 PM", "5:00 PM", "6:00 PM",
      "7:00 PM", "8:00 PM", "9:00 PM",
      "10:00 PM", "11:00 PM"
    ]
  }

  onPickedSpec(): void {
    this.doctorService.getAllDoctorsBySpec(this.specialityId.value)
      .subscribe(result => {
        this.doctors = result;
      })
  }

  onDatePicked(): void {
    this.loadAppointments(this.desiredDate)
  }

  loadAppointments(date: Date) {
    this.isLoading = true
    let body: IGetAppointmentsInRange = {
      id: this.doctorId.value,
      desiredDate: date,
    }
    this.appointmentService.getCalendarIntervalsAroundDate(body)
      .pipe(catchError(res => {
        this.isLoading = false;
        return EMPTY
      }))
      .subscribe(res => {
        console.log(res)
        this.weekIntervals = res
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      })
  }

  convertToDateTime(date: Date, time: string) {
    let chunks = time.split(":")
    let newDate = new Date(date)
    newDate.setHours(+chunks[0], +chunks[1], 0)
    newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60)

    return newDate
  }

  create() {
    if (this.from == '' || this.to == '') {
      this.toastService.error("All fields should be filled!")
      return
    }
    let startTime = this.convertToDateTime(this.startDate, this.from)
    let endTime = this.convertToDateTime(this.startDate, this.to)

    let body: ICreateAppointmentFor = {
      DoctorId: this.doctorId.value,
      PatientId: this.selectedPatientId,
      RoomId: this.selectedRoomId,
      StartAt: startTime,
      EndAt: endTime
    }

    this.appointmentService.createFor(body)
      .pipe(catchError(res => {
        const error = res.error
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
