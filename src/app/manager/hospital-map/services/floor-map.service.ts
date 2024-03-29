import { CreateFloor, IFloor } from './../model/floor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import { flatRollup } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class FloorMapService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private mapHeight = 580;
  private mapWidth = 880;

  private defaultFloorHeight = 80;
  private defaultFloorWidth = 750;
  private xOffset = 50;
  private yOffset = 450;
  private decrement = 100;

  constructor(private http: HttpClient) { }

  public createFloor(createFloor: CreateFloor): Observable<CreateFloor> {
    return this.http.post<CreateFloor>(
      `${this.apiHost}api/intranet/map/floors`,
      JSON.stringify(createFloor), 
      { headers: this.headers }
    );
  }
  
  public handleFloorGeneration(floors: IFloor[]): CreateFloor | undefined{
    const newFloor = <CreateFloor>{
      xCoordinate: this.xOffset,
      yCoordinate: this.yOffset,
      width: this.defaultFloorWidth,
      height: this.defaultFloorHeight
    };

    for (let floor of floors) {
      if(!this.checkYCoordinate(newFloor.yCoordinate, floor.yCoordinate))
        break;
      
      if(newFloor.yCoordinate - this.decrement < 0)
        return undefined;  
      
      newFloor.yCoordinate -= this.decrement;
    }

    return newFloor;
  }

  private checkYCoordinate(newY: number, oldY: number): boolean {
    return (newY >= oldY && newY <= oldY + this.defaultFloorHeight);
  }

  getFloorById(id: number): Observable<IFloor> {
    return this.http.get<IFloor>(this.apiHost + 'api/intranet/floors/' + id, {headers: this.headers});
  }
  getFloorsByBuilding(id: number): Observable<IFloor[]> {
    return this.http.get<IFloor[]>(this.apiHost + 'api/intranet/map/floors/' + id, {headers: this.headers});
  }
  updateFloor(floor: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/floors/' + floor.id, floor.name, {headers: this.headers});
  }
  

  createSVG(){
    return d3.select("#svgDiv").append("svg").attr("height", this.mapHeight).attr("width", this.mapWidth)
  }

  createRectangles(svg:any,data2:any){
    return svg.selectAll("rect").data(data2).enter().append("rect")
    .attr("height", function(d:any){ return d.height;})
    .attr("width", function(d:any){ return d.width;})
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("x", function(d:any){ return d.xCoordinate })
    .attr("y", function(d:any){ return d.yCoordinate})
    .attr("id", function(d:any){ return 'id'+ d.id})
    .attr('cursor', 'pointer')
    .on("click", function(data2:any) {
      
    });
  }
  addTextToRectangles(svg:any,data:any){
    return svg.append("text").selectAll("tspan")
      .data(data)
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
