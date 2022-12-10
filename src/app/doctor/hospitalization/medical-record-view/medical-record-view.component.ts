import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { Hospitalization } from '../model/hospitalization.model';
import { MedicalRecord } from '../model/medical-record.model';
import { HospitalizationService } from '../services/hospitalization.service';
import { MedicalRecordService } from '../services/medical-record.service';

@Component({
  selector: 'app-medical-record-view',
  templateUrl: './medical-record-view.component.html',
  styleUrls: ['./medical-record-view.component.css']
})
export class MedicalRecordViewComponent implements OnInit {

  public hospitalizations: Hospitalization[] = []
  public medicalRecord: MedicalRecord | null = null
  public columns: string[] = ["No.", "Started At", "Ended At", "Pdf", "State", "Action"]
  public isLoading: boolean = false
  public showCreate: boolean = false

  constructor(
    private readonly toastService: ToastrService,
    private readonly medicalRecordService: MedicalRecordService,
    private readonly hospitalizationService: HospitalizationService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParamMap.get('uid')
    if (id == null) return
    this.search(id + "")
  }

  closeCreate() {
    this.showCreate = false
  }

  openCreate() {
    this.showCreate = true
  }

  finishHospitalization(id: number) {
    const today = new Date();
    this.isLoading = true
    this.hospitalizationService.finishHospitalization(id, today)
      .pipe(catchError(res => {
        this.isLoading = false
        this.toastService.error(res.error.Message)
        return EMPTY
      }))
      .subscribe(res => {
        this.isLoading = false
        this.toastService.success("Successfully finished hospitalization!")
        this.getHospitalizations()
      })

  }


  search(text: string) {
    if (text == "-1") return
    this.isLoading = true
    this.updateUrl(text)
    this.medicalRecordService.getMedicalRecordByUID(text)
      .pipe(catchError(res => {
        this.isLoading = false
        return EMPTY
      }))
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

  generateReport(id: number) {
    this.isLoading = true
    this.hospitalizationService.generateReport(id)
      .pipe(catchError(res => {
        this.isLoading = false
        this.toastService.error(res.error.Message)
        return EMPTY
      }))
      .subscribe(res => {
        this.isLoading = false
        this.toastService.success("Successfully generated report!")
        this.getHospitalizations()
      })
  }



  format(dt: Date | null) {
    if (dt == null) return ""
    let date = new Date(dt)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }


  prescribeTherapies(id: number) {
    this.router.navigate(['doctor/prescribe-therapies/' + id])
  }

  showPrescribedTherapies(id: number) {
    this.router.navigate(['doctor/hospitalization-therapies/' + id])
  }


  public updateUrl(value: string) {
    const queryParams: Params = { uid: value };

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
}
