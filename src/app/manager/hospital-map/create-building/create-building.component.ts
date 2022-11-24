import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { create } from 'd3';
import { CreateBuilding } from '../model/building.model';
import { BuildingMapService } from '../services/building-map.service';

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent implements OnInit {

  public createBuilding: CreateBuilding = <CreateBuilding>{};

  constructor(private router:Router, private buildingService: BuildingMapService) {}

  ngOnInit(): void {
    this.createBuilding = <CreateBuilding>history.state.data;
    if(!this.createBuilding) {
      this.router.navigate(['manager/building-map']);
    }
  }

  public submitForm(): void {
    console.log(this.createBuilding);
    this.createBuilding.rgbColour = '#FFFFFF';
    this.buildingService.createBuilding(this.createBuilding).subscribe(() => {
      this.router.navigate(['manager/building-map']);
    });
  }
}
