import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable, Subject } from 'rxjs';
import { CreateBuilding, IBuilding } from '../model/building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingMapService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private mapHeight = 500;
  private mapWidth = 800;

  private defaultBuildingHeight = 200;
  private defaultBuildingWidth = 200;
  private offset = 35;
  
  constructor(private http: HttpClient) { }

  public createBuilding(createBuilding: CreateBuilding): Observable<CreateBuilding> {
    return this.http.post<CreateBuilding>(
      `${this.apiHost}api/intranet/map/buildings`, 
      JSON.stringify(createBuilding), 
      { headers: this.headers }
    );
  }

  public handleBuildingGeneration(buildings: IBuilding []): CreateBuilding | undefined {
    const newBuilding = <CreateBuilding>{
      xCoordinate: this.offset,
      yCoordinate: this.offset,
      width: this.defaultBuildingWidth,
      height: this.defaultBuildingHeight,
    };

    for (let building of buildings) {
      if (
        !(this.checkCoordinate(newBuilding.xCoordinate, building.xCoordinate, this.defaultBuildingWidth) &&
          this.checkCoordinate(newBuilding.yCoordinate, building.yCoordinate, this.defaultBuildingHeight))
      ) break;

      if (this.checkBorderFit(newBuilding.xCoordinate, this.defaultBuildingWidth, this.mapWidth)) {
        newBuilding.xCoordinate += this.defaultBuildingWidth + this.offset;
        continue;
      }

      newBuilding.xCoordinate = this.offset;
      if (!this.checkBorderFit(newBuilding.yCoordinate, this.defaultBuildingHeight, this.mapHeight))
        return undefined;

      newBuilding.yCoordinate += this.defaultBuildingHeight + this.offset;

    }

    return newBuilding;
  }

  private checkCoordinate(newCoordinate: number, oldCoordinate: number, def: number): boolean {
    return (newCoordinate >= oldCoordinate && newCoordinate <= oldCoordinate + def)
  }

  private checkBorderFit(newCoordinate: number, def: number, map: number): boolean {
    return (newCoordinate + 2 * def + this.offset < map);
  }

  getBuildings(): Observable<IBuilding[]> {
    return this.http.get<IBuilding[]>(this.apiHost + 'api/intranet/map/buildings', {headers: this.headers});
  }
  getBuilding(id: number): Observable<IBuilding> {
    return this.http.get<IBuilding>(this.apiHost + 'api/intranet/buildings/' + id, {headers: this.headers});
  }
  updateBuilding(building: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/buildings/' + building.id, building.name, {headers: this.headers});
  }
  
  createSVG(){
    return d3.select("#svgDiv").append("svg").attr("height", this.mapHeight).attr("width", this.mapWidth);
  }
  createRectangles(svg:any, data2:any){
    return svg.selectAll("rect").data(data2).enter().append("rect")
    .attr("height", function(d:any){ return d.height;})
    .attr("width", function(d:any){ return d.width;})
    .attr("fill", 'white')
    .attr("stroke", "black")
    .attr("x", function(d:any){ return d.xCoordinate })
    .attr("y", function(d:any){ return d.yCoordinate})
    .attr("id", function(d:any){ return d.id})
    
  }
  onClickShowName(svg:any, data2:any){
    return svg.selectAll("rect")
    .on("click",function(e:any,d:any){
      console.log(d.building.Name)
      alert(d.building.Name)
    })
  }


  addTextToRectangles(svg:any, data2:any){
    return svg.append("text").selectAll("tspan")
      .data(data2)
      .enter().append("tspan")
      .attr('x', function(d:any){ return d.xCoordinate+20 })
      .attr('y', function(d:any){ return d.yCoordinate+20 })
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("font-size", 10)
      .text(function(d:any){ return d.id; })
  }
}

