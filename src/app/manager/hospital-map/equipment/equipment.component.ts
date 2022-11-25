import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from '../../room/model/room.model';
import { Equipment } from './model/equipment.model';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  searchedEquipment: Equipment[] = [];
  roomsByEquipment: Room[] = [];
  equipment: Equipment = {} as Equipment;
  
  constructor() { }

  ngOnInit(): void {
  }

}
