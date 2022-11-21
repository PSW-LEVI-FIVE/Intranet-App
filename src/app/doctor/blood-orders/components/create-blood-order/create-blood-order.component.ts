import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { BloodOrderService } from '../../services/blood-order.service';

 enum BloodType {
  A_POSITIVE,
  A_NEGATIVE,
  B_POSITIVE,
  B_NEGATIVE,
  AB_POSITIVE,
  AB_NEGATIVE,
  ZERO_POSITIVE,
  ZERO_NEGATIVE
}


export interface ICreateBloodOrder {
  DoctorId?: number,
  Arrival: Date | null | undefined,
  BloodType?: number | null,
  Reason: string | null | undefined,
  Quantity: number | null | undefined
}

@Component({
  selector: 'app-create-blood-order',
  templateUrl: './create-blood-order.component.html',
  styleUrls: ['./create-blood-order.component.css']
})
export class CreateBloodOrderComponent implements OnInit {

  public arrival: Date = new Date();

  bloodOrderForm = this.fb.group({
    arrival: [this.arrival, Validators.required],
    reason: ['', Validators.required],
    bloodType: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
    quantity: [0, Validators.required]
  })

  public title: string = 'Create blood order';

  constructor(
    private readonly bloodOrderService: BloodOrderService,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  create() {
    if(this.bloodOrderForm.status == 'INVALID') {
      this.toastService.error("All fields should be filled!")
      return
    }

    if(this.arrival < new Date()) {
      this.toastService.error("Date should be in future!")
      return
    }

    if(Number(this.bloodOrderForm.get('quantity')?.value).valueOf() < 1) {
      this.toastService.error("Quantity should be greater than 0")
      return
    }

    const type = this.bloodOrderForm.get('bloodType')?.value
    let body: ICreateBloodOrder = {
      DoctorId: 2,
      Arrival: this.bloodOrderForm.get('arrival')?.value,
      Reason: this.bloodOrderForm.get('reason')?.value,
      BloodType: Number(type).valueOf(),
      Quantity: this.bloodOrderForm.get('quantity')?.value
    }

    this.bloodOrderService.create(body)
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
        this.toastService.success("Successfully created blood order")
        setTimeout(() => {
          this.router.navigate(["doctor/appointments"])
        }, 1000)

      })
  }

}
