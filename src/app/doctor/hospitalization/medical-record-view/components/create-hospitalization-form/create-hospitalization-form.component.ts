import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { Room } from 'src/app/manager/room/model/room.model';
import { RoomService } from 'src/app/manager/room/services/room.service';
import { PatientService } from 'src/app/shared/services/patient-service.service';
import { Bed } from '../../../model/bed.model';
import { Hospitalization, HospitalizationState } from '../../../model/hospitalization.model';
import { BedService } from '../../../services/bed.service';
import { CreateHospitalizationDTO, HospitalizationService } from '../../../services/hospitalization.service';



@Component({
  selector: 'app-create-hospitalization-form',
  templateUrl: './create-hospitalization-form.component.html',
  styleUrls: ['./create-hospitalization-form.component.css']
})
export class CreateHospitalizationFormComponent implements OnInit {

  hospitalizationFormGroup = new FormGroup({
    patient: new FormControl(null, [Validators.required]),
    room: new FormControl(null, [Validators.required]),
    bed: new FormControl(null, [Validators.required]),
    startTime: new FormControl(new Date(), [Validators.required])
  })

  public patients: any[] = []
  public rooms: Room[] = []
  public beds: Bed[] = []
  @Output() createSuccess: EventEmitter<any> = new EventEmitter();
  @Output() closeModalEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly roomService: RoomService,
    private readonly bedService: BedService,
    private readonly patientService: PatientService,
    private readonly hospitalizationService: HospitalizationService,
    private readonly toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData()
    this.hospitalizationFormGroup.get("room")?.valueChanges.subscribe(val => {
      if (val == null) return
      console.log("updated", val)
      this.loadFreeBedsForRoom(val)
    })
  }

  loadData() {
    this.loadPatients()
    this.loadRooms()
  }

  loadRooms() {
    this.roomService.getRooms().subscribe(res => {
      this.rooms = res
    })
  }

  loadPatients() {
    this.patientService.getAll().subscribe(res => {
      this.patients = res
    })
  }

  loadFreeBedsForRoom(roomId: number) {
    this.bedService.getFreeBedsForRoom(roomId).subscribe(res => {
      this.beds = res
    })
  }

  closeModal() {
    this.closeModalEmitter.emit()
  }


  save() {
    const newHosp: CreateHospitalizationDTO = {
      patientId: this.hospitalizationFormGroup.get("patient")?.value ?? -1,
      bedId: this.hospitalizationFormGroup.get("bed")?.value ?? -1,
      startTime: this.hospitalizationFormGroup.get("startTime")?.value ?? new Date(),
    }
    this.hospitalizationService.create(newHosp)
      .pipe(catchError(res => {
        this.toastService.error(res.error.Message)
        return EMPTY
      }))
      .subscribe(res => {
        this.toastService.success("Successfully added hospitalization")
        this.createSuccess.emit()
        this.closeModalEmitter.emit()
      })
  }
}
