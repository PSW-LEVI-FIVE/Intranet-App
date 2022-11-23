import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { TherapyService } from '../../../services/therapy.service';
import { catchError, EMPTY } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Medicine } from '../../../model/medicine.model';


export interface IGiveMedicineTherapy {
  HospitalizationId: number;
  GivenAt: Date | null | undefined;
  MedicineId: number | null | undefined;
  Quantity: number | null | undefined;
  DoctorId: number;
}

@Component({
  selector: 'app-give-medicine-therapy',
  templateUrl: './give-medicine-therapy.component.html',
  styleUrls: ['./give-medicine-therapy.component.css']
})
export class GiveMedicineTherapyComponent implements OnInit {

  public medicines: Medicine[] = [];

  giveMedicineTherapyForm = this.fb.group({
    medicineId: [-1, Validators.required],
    quantity: [0, Validators.required],
  })

  public title: string = 'Prescribe medicine therapy';

  constructor(private readonly therapyService: TherapyService,
    private route: ActivatedRoute,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.therapyService.getMedicine().subscribe(res => {
      this.medicines = res;
    })
  }




  createMedicineTherapy() {
    if (this.giveMedicineTherapyForm.status == 'INVALID') {
      this.toastService.error("All fields should be filled!")
      return
    }

    console.log(Number(this.route.snapshot.paramMap.get('id')));

    let body: IGiveMedicineTherapy = {
      HospitalizationId: Number(this.route.snapshot.paramMap.get('id')),
      GivenAt: new Date(),
      MedicineId: this.giveMedicineTherapyForm.get('medicineId')?.value,
      Quantity: this.giveMedicineTherapyForm.get('quantity')?.value,
      DoctorId: 0, //Preko logina ide
    }
    this.therapyService.createMedicineTherapy(body)
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
        this.toastService.success("Successfully prescribed medicine therapy")
        setTimeout(() => {
          this.router.navigate(["doctor/records"]) //Jel to ta ruta?
        }, 1000)

      })
  }
}