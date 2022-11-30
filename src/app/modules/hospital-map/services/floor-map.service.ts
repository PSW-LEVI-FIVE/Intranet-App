import { IFloor } from './../model/floor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorMapService {

 apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getFloorsByBuilding(id: number): Observable<IFloor> {
    return this.http.get<IFloor>(this.apiHost + 'api/intranet/floors/' + id, {headers: this.headers});
  }
  updateFloor(floor: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/floors/' + floor.id, floor.name, {headers: this.headers});
  }
  createSVG(){
    return d3.select("#svgDiv").append("svg").attr("height", 500).attr("width", 800)
  }
  
  createRectangles(svg:any,data2:any){
    return svg.selectAll("rect").data(data2).enter().append("rect")
    .attr("height", (d:any)=>{ return d.height;})
    .attr("width", (d:any)=>{ return d.width;})
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("x", (d:any)=>{ return d.xCoordinate })
    .attr("y", (d:any)=>{ return d.yCoordinate})
    .attr("id", (d:any)=>{ return d.id})
    .on("click", function(data2:any) {
      
    });
  }
  addTextToRectangles(svg:any,data:any){
    return svg.append("text").selectAll("tspan")
      .data(data)
      .enter().append("tspan")
      .attr('x', (d:any)=>{ return d.xCoordinate+20 })
      .attr('y', (d:any)=>{ return d.yCoordinate+20 })
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("font-size", 10)
      .text((d:any)=>{ return d.id; })
  }

}
