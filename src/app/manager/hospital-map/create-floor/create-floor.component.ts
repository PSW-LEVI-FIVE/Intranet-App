import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { FloorMapComponent } from '../floor-map/floor-map.component';
import { CreateFloor } from '../model/floor.model';
import { FloorMapService } from '../services/floor-map.service';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent implements OnInit {

  public createFloor: CreateFloor = <CreateFloor>{};

  constructor(private router: Router, private floorService: FloorMapService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.createFloor = <CreateFloor>history.state.data;
    if(!this.createFloor) {
      this.router.navigate([`manager/building-map`]);
    }
  }

  public submitForm(): void {
    this.createFloor.rgbColour = '#FFFFFF';
    this.floorService.createFloor(this.createFloor)
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
        this.router.navigate([`manager/floor-map/${this.createFloor.buildingId}`]);
      }, 1000);
    });
  }
}
