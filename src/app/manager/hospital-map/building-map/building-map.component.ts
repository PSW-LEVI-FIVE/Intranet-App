import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BuildingMapService } from '../services/building-map.service';
import { CreateBuilding, IBuilding } from '../model/building.model';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../services/navigation.service';
import * as d3 from 'd3';
import { CreateBuildingComponent } from '../create-building/create-building.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-building-map',
  templateUrl: './building-map.component.html',
  styleUrls: ['./building-map.component.css'],
  providers: [BuildingMapService]
})
export class BuildingMapComponent implements OnInit {

  public dataSource = new MatTableDataSource<IBuilding>();
  public buildings: IBuilding[] = [];
  data: any;
  svg: any;
  buildingsMap: any;
  buildingsText: any;
  public selectedBuilding: any = undefined;
  public selectedBuildingId: any;
  formVisible: any = "hidden";

  constructor(
    private dialog: MatDialog,
    private buildingMapService: BuildingMapService,
    private router: Router,
    private toastService: ToastrService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.navigationService.resetNavigation();
    this.buildingMapService.getBuildings().subscribe(res => {
      this.buildings = res;
      this.dataSource.data = this.buildings;
      this.svg = this.buildingMapService.createSVG();
      this.buildingsMap = this.buildingMapService.createRectangles(this.svg, this.buildings);
      this.buildingsText = this.buildingMapService.addTextToRectangles(this.svg, this.buildings);
      this.addOnClick(this.buildingsMap, this);
      this.showFloors(this.buildingsMap, this.router);
    })
  }

  public toggleCreate(): void {
    const createBuilding = this.buildingMapService.handleBuildingGeneration(this.buildings);
    if (createBuilding) {
      const dialogRef = this.dialog.open(CreateBuildingComponent, {
        data: createBuilding,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
      // this.router.navigate(['manager/create-building'], { state: { data: createBuilding } });
    } else {
      this.toastService.info('Maximum number of buildings reached');
    }
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(["/login"]);
  }
  addOnClick(svg: any, component: BuildingMapComponent) {
    svg.on("click", function (this: any, d: any, i: any) {
      component.formVisible = "visible";
      component.selectedBuilding = i;
      component.buildingMapService.getBuilding(i.id).subscribe(res => {
        component.selectedBuilding = res;
        console.log(res)
      })
      d3.selectAll("rect").style("fill", '#ffffff');
      d3.select(this).style("fill", "#9e91bd")
    })
  }
  showFloors(svg: any, router: any) {
    svg.on("dblclick", function (d: any, i: any) {
      router.navigate(['manager/floor-map/' + i.id])
    })
  }
  public updateBuilding(): void {
    if (!this.isValidInput()) return;
    this.buildingMapService.updateBuilding(this.selectedBuilding);
  }

  private isValidInput(): boolean {
    return this.selectedBuilding?.number != '' && this.selectedBuilding?.floors.toString() != '';
  }
}


