import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class FloorMapService {

  constructor() { }
  getData(){
    var data2 = [{
      "x": 100,
      "y": 255,
      "w": 200,
      "h": 200,
      "color": "white",
      "name": "Floor 1",
      "id": "f1"
    },
    {
      "x": 100,
      "y": 50,
      "w": 200,
      "h": 200,
      "color": "white",
      "name": "Floor 2",
      "id": "f2"
    } ]
    return data2;
  }

  createSVG(){
    return d3.select("body").append("svg").attr("height", 600).attr("width", 900)
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
