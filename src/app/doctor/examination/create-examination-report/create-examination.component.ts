import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SymptomService } from '../services/symptom.service';
import { Symptom } from '../model/symptom.model';
import { Medicine } from '../../hospitalization/model/medicine.model';
import { MedicineService } from '../services/medicine.service';
import { Prescription } from '../model/prescription.model';
import { CreateExaminationReportDTO } from '../dtos/create-examination-report.dto';
import { ExaminationReportService } from '../services/examination-report.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminationReportEventDTO } from '../dtos/examination-report-event.dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../team-building/dialogs/reason-dialog.component';

@Component({
  selector: 'app-create-examination',
  templateUrl: './create-examination.component.html',
  styleUrls: ['./create-examination.component.css']
})
export class CreateExaminationComponent implements OnInit {
  patientFormGroup = new FormGroup({
    patient: new FormControl()
  })
  symptomFormGroup = new FormGroup({
    symptom: new FormControl(''),
  });
  reportFormGroup = new FormGroup({
    report: new FormControl('', [Validators.required])
  });
  medicineFormGroup = new FormGroup({
    medicine: new FormControl('')
  })
  prescriptionFormGroup = new FormGroup({})
  public searchText: FormControl = new FormControl()


  selectedResult: number | null = null


  startedReport: any = null
  reportUuid: string = '';
  symptoms: Symptom[] = []
  allSymptoms: Symptom[] = []
  prescriptions: Prescription[] = []
  allMedicines: Medicine[] = []
  addOnBlur = true;
  searchResults: any[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  isLinear = false
  constructor(
    private readonly symptomService: SymptomService,
    private readonly medicineService: MedicineService,
    private readonly examinationReportService: ExaminationReportService,
    private readonly toastService: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public readonly dialogRef: MatDialogRef<CreateExaminationComponent>,
  ) { }

  ngOnInit(): void {

    this.symptomFormGroup.get('symptom')?.valueChanges.subscribe(change => {
      if (typeof (change) === "number" || change == null) return
      this.findSymptoms(change)
    })


    this.medicineFormGroup.get('medicine')?.valueChanges.subscribe(change => {
      if (typeof (change) === "number" || change == null) return
      this.findMedicines(change)
    })

    // let examinationId = Number(this.route.snapshot.paramMap.get("id"))
    let examinationId = this.data.id;
    this.examinationReportService.startReport(examinationId).subscribe(res => {
      this.reportUuid = res.uuid;
      this.startedReport = res
    })
  }
  emitSearch() {
    const dto = {
      Content: this.searchText.value
    }
    this.examinationReportService.searchReports(dto).subscribe(res => {
      this.searchResults = res;
      console.log(res);
    })
  }
  sendEvent(type: number) {
    this.mapPrescriptionDoses()
    const dto: ExaminationReportEventDTO = {
      eventType: type,
      time: new Date(),
      uuid: this.reportUuid,
      examinationReportId: this.startedReport.id
    }

    this.examinationReportService.sendEvent(dto).subscribe(res => {
      this.reportUuid = res.uuid;
      this.startedReport = res
    })
  }

  remove(val: Symptom) {
    this.symptoms = this.symptoms.filter(s => s.id != val.id)
  }

  selected(val: any) {
    const symptom = { name: val.option.viewValue, id: val.option.value }
    if (this.symptoms.some(s => s.id == symptom.id)) return
    this.symptoms.push(symptom)
  }

  search(ev: any) {
    console.log('search')
    this.findSymptoms(ev.value)
  }

  findSymptoms(val: string) {
    this.symptomService.searchSymptoms(val).subscribe(res => {
      this.allSymptoms = res
    })
  }

  selectedMedicine(ev: any) {
    const medicine: Medicine = { id: ev.option.value, name: ev.option.viewValue, quantity: 0 }
    const prescription: Prescription = { dose: "", medicineId: medicine.id, medicineName: medicine.name }
    if (this.prescriptions.some(p => p.medicineId == medicine.id)) return
    this.prescriptionFormGroup.addControl(prescription.medicineId + "", new FormControl(prescription.dose, Validators.required))
    this.prescriptions.push(prescription);
  }

  displayFn(value?: number) {
    const medicine = this.allMedicines.find(med => med.id == value)
    if (medicine === undefined) return ""
    return medicine.name
  }

  findMedicines(val: string) {
    this.medicineService.searchMedicine(val).subscribe(res => {
      this.allMedicines = res
    })
  }

  removePrescription(id: number) {
    this.prescriptions = this.prescriptions.filter(p => p.medicineId != id)
    this.prescriptionFormGroup.removeControl(id + "")
  }

  sendReport() {
    if (!this.formsValid()) {
      this.toastService.error("All steppers should be valid!")
      return
    }
    const dto: CreateExaminationReportDTO = {
      id: this.startedReport ? this.startedReport.id : 0,
      content: this.reportFormGroup.get('report')?.value,
      prescriptions: this.mapPrescriptionDoses(),
      symptoms: this.symptoms,
      examinationId: this.data.id
    }

    this.examinationReportService.sendReport(dto, this.reportUuid)
      .pipe(catchError(res => {
        console.log(res.error.Message)
        if (res.error) {
          this.toastService.error(res.error.Message)
        }
        return EMPTY
      }))
      .subscribe(res => {
        this.toastService.success("Successfully created report")
        this.dialogRef.close();
      })
  }

  formsValid() {
    return this.reportFormGroup.valid && this.prescriptionFormGroup.valid && this.symptomFormGroup.valid
  }

  mapPrescriptionDoses() {
    return this.prescriptions.map(prescription => {
      let dose = this.prescriptionFormGroup.get(prescription.medicineId + "")?.value
      prescription.dose = dose
      return prescription
    })

  }

  selectResult(id: number) {
    if (this.selectedResult == id)
      this.selectedResult = null
    else
      this.selectedResult = id
    console.log(id, this.selectedResult)
  }

}
