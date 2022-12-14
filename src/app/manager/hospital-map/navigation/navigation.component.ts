import { Component, Input, OnInit } from '@angular/core';
import { IRoom } from '../model/room.model';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() public selectedBuilding: number | undefined;
  public buildingRooms: IRoom[] = [];
  public selectedRoom: IRoom = <IRoom>{};

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.resetNavigation();
  }

  ngOnChanges(): void {
    if(this.selectedBuilding){
      this.navigationService.makeBuildingScope(this.selectedBuilding);
      this.buildingRooms = this.navigationService.getRoomsByBuilding();
    }
  }

  public navigate(): void {
    this.navigationService.navigateSetup(this.selectedRoom);
  }
}