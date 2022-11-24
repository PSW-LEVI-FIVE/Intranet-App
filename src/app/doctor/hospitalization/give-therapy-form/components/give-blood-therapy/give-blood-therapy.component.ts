import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { TherapyService } from '../../../services/therapy.service';
import { catchError, EMPTY } from 'rxjs';
import { BloodType } from '../../../model/blood.model';

export interface IGiveBloodTherapy {
  HospitalizationId: number | null | undefined;
  GivenAt: Date | null | undefined;
  Type: number | null | undefined;
  Quantity: number | null | undefined;
  DoctorId: number | null | undefined;
}

export type BloodToShow = {
  bType: number;
  name: string;
};

@Component({
  selector: 'app-give-blood-therapy',
  templateUrl: './give-blood-therapy.component.html',
  styleUrls: ['./give-blood-therapy.component.css']
})

export class GiveBloodTherapyComponent implements OnInit {

  public allBloodTypes: number[] = [];
  public allBlood: BloodToShow[] = [];

  giveBloodTherapyForm = this.fb.group({
    bloodType: [-1, Validators.required],
    quantity: [0, Validators.required],
  })

  public title: string = 'Prescribe blood therapy';
  public hospId: number = Number(this.route.snapshot.paramMap.get('id'));

  constructor(private readonly therapyService: TherapyService,
    private route: ActivatedRoute,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private fb: FormBuilder) { }



  ngOnInit(): void {
    this.therapyService.getBlood(this.hospId).subscribe(res => {
      this.allBloodTypes = res;
      this.giveNameByType(this.allBloodTypes);
    })
  }

  giveNameByType(blood: number[]) {
    blood.forEach(element => {
      let one: BloodToShow = { bType: -1, name: "" };
      if (element == 0) {
        one.bType = 0;
        one.name = "A+";
        this.allBlood.push(one);
      }
      else if (element == 1) {
        one.bType = 1;
        one.name = "A-";
        this.allBlood.push(one);
      }
      else if (element == 2) {
        one.bType = 2;
        one.name = "B+";
        this.allBlood.push(one);
      }
      else if (element == 3) {
        one.bType = 3;
        one.name = "B-";
        this.allBlood.push(one);
      }
      else if (element == 4) {
        one.bType = 4;
        one.name = "AB+";
        this.allBlood.push(one);
      }
      else if (element == 5) {
        one.bType = 5;
        one.name = "AB-";
        this.allBlood.push(one);
      }
      else if (element == 6) {
        one.bType = 6;
        one.name = "O+";
        this.allBlood.push(one);
      }
      else {
        one.bType = 7;
        one.name = "O-";
        this.allBlood.push(one);
      }
    });
  }


  createBloodTherapy() {
    if (this.giveBloodTherapyForm.status == 'INVALID') {
      this.toastService.error("All fields should be filled!")
      return
    }

    let body: IGiveBloodTherapy = {
      HospitalizationId: this.hospId,
      GivenAt: new Date(),
      Type: this.giveBloodTherapyForm.get('bloodType')?.value,
      Quantity: this.giveBloodTherapyForm.get('quantity')?.value,
      DoctorId: 7, //Preko logina bi trebalo
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

