import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import { IBuilding } from '../model/building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingMapService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getBuildings(): Observable<IBuilding[]> {
    return this.http.get<IBuilding[]>(this.apiHost + 'api/intranet/map/buildings', {headers: this.headers});
  }
  getBuilding(id: number): Observable<IBuilding> {
    return this.http.get<IBuilding>(this.apiHost + 'api/intranet/buildings/' + id, {headers: this.headers});
  }
  updateBuilding(building: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/buildings/' + building.id, building.name, {headers: this.headers});
  }
  // constructor() { }
  // getData(){
  //   var data2 = [{
  //     "x": 100,
  //     "y": 100,
  //     "w": 265,
  //     "h": 245,
  //     "color": "white",
  //     "name": "Building 1",
  //     "id": "b1",
  //     "address":"Bulevar Oslobodjenja 6"
  //   },
  //   {
  //     "x": 370,
  //     "y": 100,
  //     "w": 255,
  //     "h": 245,
  //     "color": "white",
  //     "name": "Building 2",
  //     "id": "b2",
  //     "address":"Bulevar Bate Brkica 9"
  //   } ]
  //   return data2;
  // }
  createSVG(){
    return d3.select("#svgDiv").append("svg").attr("height", 500).attr("width", 800)
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
