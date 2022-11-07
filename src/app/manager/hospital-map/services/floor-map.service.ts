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
  getFloorById(id: number): Observable<IFloor> {
    return this.http.get<IFloor>(this.apiHost + 'api/intranet/floors/' + id, {headers: this.headers});
  }
  getFloorsByBuilding(id: number): Observable<IFloor> {
    return this.http.get<IFloor>(this.apiHost + 'api/intranet/map/floors/' + id, {headers: this.headers});
  }
  updateFloor(floor: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/intranet/floors/' + floor.id, floor.name, {headers: this.headers});
  }
  // getData(){
  //   var data2 = [{
  //     "x": 100,
  //     "y": 255,
  //     "w": 200,
  //     "h": 200,
  //     "color": "white",
  //     "area": 400,
  //     "name": "Floor 1",
  //     "id": "f1"
  //   },
  //   {
  //     "x": 100,
  //     "y": 50,
  //     "w": 200,
  //     "h": 200,
  //     "color": "white",
  //     "area": 400,
  //     "name": "Floor 2",
  //     "id": "f2"
  //   } ]
  //   return data2;
  // }

  createSVG(){
    return d3.select("#svgDiv").append("svg").attr("height", 500).attr("width", 800)
  }

  createRectangles(svg:any,data2:any){
    return svg.selectAll("rect").data(data2).enter().append("rect")
    .attr("height", function(d:any){ return d.height;})
    .attr("width", function(d:any){ return d.width;})
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("x", function(d:any){ return d.xCoordinate })
    .attr("y", function(d:any){ return d.yCoordinate})
    .attr("id", function(d:any){ return d.id})
    .on("click", function(data2:any) {
      console.log("caooo")
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
  onClickShowName(svg:any, data2:any){
    return svg.selectAll("rect")
    .on("click",function(e:any,d:any){
      d3.select("#div1")
    .append("label").text("Floor")
    .append("label").text("hh")
    .append("input").attr("type","text")
    .attr("value","meee")
  
   d3.select("#div2")
   .append("label").text("Building")
   .append("input").attr("type","text")
   .attr("value","ggeeg")

   d3.select("#div3")
   .append("label").text("Name")
   .append("input").attr("type","text")
   .attr("value","ee")
      console.log(d.name)
      //alert(d.name)
    })
  }

  createRectangleForAdditionalInformation(svg:any,d:any){
    d3.select("#div1")
    .append("label").text("Floor")
    .append("label").text("hh")
    .append("input").attr("type","text")
    .attr("value","meee")
  
   d3.select("#div2")
   .append("label").text("Building")
   .append("input").attr("type","text")
   .attr("value","ggeeg")

   d3.select("#div3")
   .append("label").text("Name")
   .append("input").attr("type","text")
   .attr("value","ee")
   
    
     
     
}

}
