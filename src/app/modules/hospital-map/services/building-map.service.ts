import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class BuildingMapService {

  constructor() { }
  getData(){
    var data2 = [{
      "x": 100,
      "y": 100,
      "w": 265,
      "h": 245,
      "color": "white",
      "name": "Building 1",
      "id": "b1"
    },
    {
      "x": 370,
      "y": 100,
      "w": 255,
      "h": 245,
      "color": "white",
      "name": "Building 2",
      "id": "b2"
    } ]
    return data2;
  }
  createSVG(){
    return d3.select("#svgDiv").append("svg").attr("height", 500).attr("width", 800)
  }
  createRectangles(svg:any, data2:any){
    return svg.selectAll("rect").data(data2).enter().append("rect")
    .attr("height", function(d:any){ return d.h;})
    .attr("width", function(d:any){ return d.w;})
    .attr("fill", function(d:any){return d.color;})
    .attr("stroke", "black")
    .attr("x", function(d:any){ return d.x })
    .attr("y", function(d:any){ return d.y})
    .attr("id", function(d:any){ return d.id})
    .on("click", function(data2:any) {
      console.log("caooo")
    });
    
  }
  onClickShowName(svg:any, data2:any){
    return svg.selectAll("rect")
    .on("click",function(e:any,d:any){
      console.log(d.name)
      alert(d.name)
    })
  }


  addTextToRectangles(svg:any, data2:any){
    return svg.append("text").selectAll("tspan")
      .data(data2)
      .enter().append("tspan")
      .attr('x', function(d:any){ return d.x+20 })
      .attr('y', function(d:any){ return d.y+20 })
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("font-size", 10)
      .text(function(d:any){ return d.name; })
      .on("click", function(d:any) {
        alert(d.name)
      });
  }
}

