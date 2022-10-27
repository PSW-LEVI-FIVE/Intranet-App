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
}
