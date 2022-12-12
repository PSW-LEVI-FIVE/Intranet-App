import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';

import { ConsiliumService } from '../../services/consilium.service';

export interface GetBestConsiliumsDTO {
  from: Date | null | undefined;
  to: Date | null | undefined;
  doctors: number[];
  consiliumDuration: number | null | undefined;
}

export interface IDoctorDTO {
  id: number;
  name: string;
  surname: string;
  specialityId: number;
}

export interface ISpecialityDTO {
  id: number;
  name: string;
}
export interface SuggestReadable {
  from: string | undefined;
  to: string;
  doctors: IDoctorDTO[];
}

export interface CreateConsiliumDTO {
  start: Date;
  end: Date;
  roomId: number;
  title: string | null | undefined;
  doctors: number[];
}

@Component({
  selector: 'app-create-consilium',
  templateUrl: './create-consilium.component.html',
  styleUrls: ['./create-consilium.component.css']
})
export class CreateConsiliumComponent implements OnInit {

  public fromDate: Date = new Date();

  public toDate: Date = new Date();

  public title:string = 'Create consilium'

  public searchType:boolean = false;

  public doctors:IDoctorDTO[] = [];

  public specialities:ISpecialityDTO[] = [];

  public isFound: boolean = false;

  public foundSuggest: CreateConsiliumDTO | undefined; 

  public bestSuggest: SuggestReadable|undefined;

  createConsiliumForm = this.fb.group({
    fromDate: [this.fromDate, Validators.required],
    toDate: [this.toDate, Validators.required],
    reason: ['', Validators.required], 
    duration: [0, Validators.required]
  })

  public ids = new FormControl('');

  public speciality = new FormControl('');

  constructor(private readonly toastService: ToastrService,
    private readonly router: Router,
    private fb: FormBuilder,
    private readonly consiliumService: ConsiliumService) { }

  ngOnInit(): void {
    this.consiliumService.getAllDoctors()
      .subscribe(result => {
        this.doctors = result
      })

    this.consiliumService.getAllSpecialities()
    .subscribe(result => {
      this.specialities = result
    })
  }

  changeSearchType(): void {
    this.searchType = !this.searchType;
  }

  suggest(): void {
    if (this.createConsiliumForm.status == 'INVALID') {
      this.toastService.error("All fields should be filled!")
      return
    }

    let from = this.createConsiliumForm.get('fromDate')?.value;
    let to = this.createConsiliumForm.get('toDate')?.value;

    if (from == null || to == null) return;
    let today = new Date()

    if (from.getDate() <= today.getDate()) {
      this.toastService.error("Date should be in future!")
      return
    }

    if (from <= to) {
      this.toastService.error("Start should be before end!")
      return
    }

    if (Number(this.createConsiliumForm.get('duration')?.value).valueOf() < 1) {
      this.toastService.error("Duration should be greater than 0")
      return
    }



    var docs: number[] = [];
    if (!this.searchType) {
      docs = this.doctors.filter(d => d.specialityId === Number(this.speciality.value)).map(d => d.id);
    } else {
      Object.entries(Object(this.ids.value)).forEach(([key, value], index) => {
        console.log(value);
        docs.push(Number(value));
      })
    }
    const startAt = this.createConsiliumForm.get('fromDate')?.value;
    const endAt = this.createConsiliumForm.get('toDate')?.value;
    const duration = this.createConsiliumForm.get('duration')?.value;

    startAt?.setDate(startAt.getDate() + 1)
    endAt?.setDate(endAt.getDate() + 1)
    const dto:GetBestConsiliumsDTO = {
      from: startAt,
      to: endAt,
      doctors: docs,
      consiliumDuration: duration
    }
    var res: GetBestConsiliumsDTO | null = null;
    this.consiliumService.getSuggestedSlots(dto)
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
    .subscribe(result => {
      this.bestSuggest = this.makeReadable(result)
      this.foundSuggest = this.makeCreateDto(result);
      this.isFound = true;
    })
  }

  makeReadable(dto: GetBestConsiliumsDTO): SuggestReadable|undefined {
    var ds: IDoctorDTO[] = [];
    let i = 0;
    dto.doctors.forEach(id => {
      var d = this.doctors.find(d => d.id === id)
      if (d !== undefined) {
        ds[i] = d;
      }
      i++;
    });
    if (dto.from != null && dto.to != null && ds !== undefined) {
      var value: SuggestReadable = {
        from: dto.from.toLocaleString().replace('T', ' '),
        to: dto.to.toLocaleString().replace('T', ' '),
        doctors: ds
      }
      return value;
    }
    
    return undefined;
  }

  makeCreateDto(dto: GetBestConsiliumsDTO): CreateConsiliumDTO|undefined  {
    if (dto.from != null && dto.to != null ) {
      var value: CreateConsiliumDTO = {
        start: dto.from,
        end: dto.to,
        title: this.createConsiliumForm.get('reason')?.value,
        roomId: 1,
        doctors: dto.doctors
      }
      return value;
    }
    
    return undefined;
  }

  create() {
    this.consiliumService.create(this.foundSuggest)
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
      this.toastService.success("Successfully created consilium")
      setTimeout(() => {
        this.router.navigate(["doctor/appointments"])
      }, 1000)

    })
  }

}
