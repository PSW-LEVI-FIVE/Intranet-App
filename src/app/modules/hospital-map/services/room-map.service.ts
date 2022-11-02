import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomMapService {

  constructor() { }
  getData(){
    var data2 = [{
      "x": 160,
      "y": 150,
      "w": 105,
      "h": 45,
      "name": "Room 1",
      "id": "r1"
    },
    {
      "x": 273,
      "y": 150,
      "w": 100,
      "h": 45,
      "name": "Room 2",
      "id": "r2"
    },
    {
      "x": 381,
      "y": 150,
      "w": 105,
      "h": 45,
      "name": "Room 3",
      "id": "r3"
    },
    {
      "x": 160,
      "y": 200,
      "w": 105,
      "h": 65,
      "name": "Room 4",
      "id": "r4"
    },
    {
      "x": 272,
      "y": 200,
      "w": 215,
      "h": 65,
      "name": "Room 5",
      "id": "r5"
    } ]
    return data2;
  }

  createRectangles(svg:any, data2:any){
    return svg.selectAll("rect").data(data2).enter().append("rect")
    .attr("height", function(d:any){ return d.h;})
    .attr("width", function(d:any){ return d.w;})
    .attr("fill", '#d7d5db')
    .attr("stroke", "black")
    .attr("x", function(d:any){ return d.x })
    .attr("y", function(d:any){ return d.y})
    .attr("id", function(d:any){ return d.id})
    .attr('cursor', 'pointer')
    
  }
}
