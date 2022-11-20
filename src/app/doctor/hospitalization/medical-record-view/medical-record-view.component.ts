import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { Hospitalization } from '../model/hospitalization.model';
import { MedicalRecord } from '../model/medical-record.model';
import { MedicalRecordService } from '../services/medical-record.service';

@Component({
  selector: 'app-medical-record-view',
  templateUrl: './medical-record-view.component.html',
  styleUrls: ['./medical-record-view.component.css']
})
export class MedicalRecordViewComponent implements OnInit {

  public hospitalizations: Hospitalization[] = []
  public medicalRecord: MedicalRecord | null = null
  public id: number = 0
  public columns: string[] = ["No.", "Started At", "Ended At", "Pdf", "State", "Action"]
  public isLoading: boolean = false

  constructor(
    private readonly toastService: ToastrService,
    private readonly medicalRecordService: MedicalRecordService,
  ) { }

  ngOnInit(): void {

  }


  search(text: string) {
    this.isLoading = true
    setTimeout(() => {
      this.medicalRecordService.getMedicalRecordByUID(text)
        .subscribe(res => {
          this.medicalRecord = res
          if (res == null) {
            this.hospitalizations = []
            this.isLoading = false
            this.toastService.error("Medical record for given UID doesn't exist!")
          } else {
            this.getHospitalizations()
          }
        })
    }, 3000)

  }


  getHospitalizations() {
    if (this.medicalRecord == null) {
      this.hospitalizations = []
      return
    }
    this.medicalRecordService.getHospitalizations(this.medicalRecord?.patient.id)
      .pipe(catchError(res => {
        this.toastService.error("Something wrong with capturing hospitalizations!")
        this.isLoading = false;
        return EMPTY
      }))
      .subscribe(res => {
        this.hospitalizations = res
        this.isLoading = false
      })
  }


  format(dt: Date | null) {
    if (dt == null) return ""
    let date = new Date(dt)
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

}
