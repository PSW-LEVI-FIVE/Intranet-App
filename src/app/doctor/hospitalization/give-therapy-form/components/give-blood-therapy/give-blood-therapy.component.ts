import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { TherapyService } from '../../../services/therapy.service';
import { catchError, EMPTY } from 'rxjs';
import { Blood } from '../../../model/blood.model';

export interface IGiveBloodTherapy {
  HospitalizationId: number | null | undefined;
  GivenAt: Date | null | undefined;
  Type: number | null | undefined;
  Quantity: number | null | undefined;
  DoctorId: number | null | undefined;
}

@Component({
  selector: 'app-give-blood-therapy',
  templateUrl: './give-blood-therapy.component.html',
  styleUrls: ['./give-blood-therapy.component.css']
})



export class GiveBloodTherapyComponent implements OnInit {

  public allBlood: Blood[] = [];

  giveBloodTherapyForm = this.fb.group({
    bloodType: [-1, Validators.required],
    quantity: [0, Validators.required],
  })

  public title: string = 'Prescribe blood therapy';

  constructor(private readonly therapyService: TherapyService,
    private route: ActivatedRoute,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.therapyService.getBlood().subscribe(res => {
      this.allBlood = res;
      this.giveNameByType(this.allBlood);
    })
  }

  giveNameByType(blood: Blood[]) {
    blood.forEach(element => {
      if (element.bloodType == 0)
        element.name = "A positive";
      else if (element.bloodType == 1)
        element.name = "A negative";
      else if (element.bloodType == 2)
        element.name = "B positive";
      else if (element.bloodType == 3)
        element.name = "B negative";
      else if (element.bloodType == 4)
        element.name = "AB positive";
      else if (element.bloodType == 5)
        element.name = "AB negative";
      else if (element.bloodType == 6)
        element.name = "0 positive";
      else
        element.name = "0 negative";
    });
  }


  createBloodTherapy() {
    if (this.giveBloodTherapyForm.status == 'INVALID') {
      this.toastService.error("All fields should be filled!")
      return
    }

    let body: IGiveBloodTherapy = {
      HospitalizationId: 1, //Number(this.route.snapshot.paramMap.get('id')),
      GivenAt: new Date(),
      Type: this.giveBloodTherapyForm.get('bloodType')?.value,
      Quantity: this.giveBloodTherapyForm.get('quantity')?.value,
      DoctorId: 1, //Preko logina bi trebalo
    }

    console.log(body)

    this.therapyService.createBloodTherapy(body)
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
        this.toastService.success("Successfully prescribed blood therapy")
        setTimeout(() => {
          this.router.navigate(["doctor/records"]) //Jel to ta ruta?
        }, 1000)

      })
  }
}

