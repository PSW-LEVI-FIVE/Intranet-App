import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomMapService {

  constructor() { }
  getData(){
    var data2 = [{
      "x": 160,
      "y": 100,
      "w": 105,
      "h": 45,
      "color": "orange",
      "name": "Room 1",
      "id": "r1"
    },
    {
      "x": 270,
      "y": 100,
      "w": 105,
      "h": 45,
      "color": "blue",
      "name": "Room 2",
      "id": "r2"
    },
    {
      "x": 380,
      "y": 100,
      "w": 105,
      "h": 45,
      "color": "green",
      "name": "Room 3",
      "id": "r3"
    },
    {
      "x": 160,
      "y": 150,
      "w": 107,
      "h": 45,
      "color": "red",
      "name": "Room 4",
      "id": "r4"
    },
    {
      "x": 272,
      "y": 150,
      "w": 213,
      "h": 45,
      "color": "yellow",
      "name": "Room 5",
      "id": "r5"
    } ]
    return data2;
  }
}
