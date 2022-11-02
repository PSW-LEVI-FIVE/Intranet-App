import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../model/room.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  public room: Room = new Room();

  constructor(private roomService: RoomService, private router: Router) { }

  public createRoom() {
    if (!this.isValidInput()) return;
    this.roomService.createRoom(this.room).subscribe(res => {
      this.router.navigate(['/rooms']);
    });
  }

  private isValidInput(): boolean {
    return this.room?.number != '' && this.room?.floor.toString() != '';
  }
}
