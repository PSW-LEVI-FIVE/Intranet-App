import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { create } from 'd3';
import { NgZone} from '@angular/core'
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { CreateBuilding } from '../model/building.model';
import { BuildingMapService } from '../services/building-map.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent implements OnInit {

  public createBuilding: CreateBuilding = <CreateBuilding>{};

  constructor(private router:Router,
     private buildingService: BuildingMapService,
      private toastService: ToastrService
      ) {}
      
  ngOnInit(): void {
    this.createBuilding = <CreateBuilding>history.state.data;
    if(!this.createBuilding) {
      this.router.navigate(['manager/building-map']);
    }
  }

 
  

  public submitForm(): void {
    this.createBuilding.rgbColour = '#FFFFFF';
    this.buildingService.createBuilding(this.createBuilding)
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
    .subscribe(() => {
      this.toastService.success('Successfully created');
      setTimeout(() => {
        this.router.navigate(['manager/building-map']);
      }, 1000);
    });
  }
}
