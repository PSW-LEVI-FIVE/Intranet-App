import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { create } from 'd3';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { CreateBuilding } from '../model/building.model';
import { BuildingMapService } from '../services/building-map.service';

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent implements OnInit {

  public createBuilding: CreateBuilding = <CreateBuilding>{};

  constructor(
    public dialogRef: MatDialogRef<CreateBuildingComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CreateBuilding,
    private router: Router, private buildingService: BuildingMapService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.createBuilding = this.data
    if (!this.createBuilding) {
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
        this.dialogRef.close();
      });
  }
}
