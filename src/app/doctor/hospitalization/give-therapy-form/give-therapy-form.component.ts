import { Component, OnInit } from '@angular/core';
import { NgxMatDatetimeContent } from "@angular-material-components/datetime-picker";
import { Time } from "@angular/common";
import { PatientService } from 'src/app/shared/services/patient-service.service';
import { RoomService } from 'src/app/manager/room/services/room.service';
import { Room } from 'src/app/manager/room/model/room.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';


@Component({
  selector: 'app-give-therapy-form',
  templateUrl: './give-therapy-form.component.html',
  styleUrls: ['./give-therapy-form.component.css']
})
export class GiveTherapyFormComponent implements OnInit {

  radioForm = this.fb.group({
    radioSelected: [1]
  })


  constructor(private route: ActivatedRoute,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
