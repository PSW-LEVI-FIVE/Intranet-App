import { Component, OnInit } from '@angular/core';
import { Room } from '../room/model/room.model';
import { Equipment } from './model/equipment.model';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  
  equipment: Equipment = {} as Equipment;
  searchedEquipment: Equipment[] = [];
  roomsByEquipment: Room[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
