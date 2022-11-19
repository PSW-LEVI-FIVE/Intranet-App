import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { AnnualLeaveService } from '../../services/annual-leave.service';
import { catchError, EMPTY } from 'rxjs';


export interface ICreateAnnualLeave {
    DoctorId?: number;
    Reason: string | null | undefined;
    StartAt: Date | null | undefined;
    EndAt: Date | null | undefined;
    IsUrgent: boolean | null | undefined;
}


@Component({
  selector: 'app-create-annual-leave',
  templateUrl: './create-annual-leave.component.html',
  styleUrls: ['./create-annual-leave.component.css']
})
export class CreateAnnualLeaveComponent implements OnInit {

  public startDate: Date = new Date();
  public endDate: Date = new Date();

  annualLeaveForm = this.fb.group({
    startDate: [this.startDate, Validators.required],
    endDate: [this.endDate, Validators.required],
    reason: ['', Validators.required],
    isUrgent: [false],
  })

  public title: string = 'Create annual leave';

  constructor(
    private readonly annualLeaveService: AnnualLeaveService,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  create() {
    if(this.annualLeaveForm.status == 'INVALID') {
      this.toastService.error("All fields should be filled!")
      return
    }

    let body: ICreateAnnualLeave = {
      DoctorId: 2,
      StartAt: this.annualLeaveForm.get('startDate')?.value,
      EndAt: this.annualLeaveForm.get('endDate')?.value,
      Reason: this.annualLeaveForm.get('reason')?.value,
      IsUrgent: this.annualLeaveForm.get('isUrgent')?.value
    }

    console.log(body)

    this.annualLeaveService.create(body)
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
        this.toastService.success("Successfully created annual leave")
        setTimeout(() => {
          this.router.navigate(["doctor/appointments"])
        }, 1000)

      })
  }

}
