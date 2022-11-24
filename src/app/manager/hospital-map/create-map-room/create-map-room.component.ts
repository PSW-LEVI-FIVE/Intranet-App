import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { CreateRoom } from '../model/room.model';
import { RoomMapService } from '../services/room-map.service';

@Component({
  selector: 'app-create-map-room',
  templateUrl: './create-map-room.component.html',
  styleUrls: ['./create-map-room.component.css']
})
export class CreateMapRoomComponent implements OnInit {

  public createRoom : CreateRoom = <CreateRoom>{};

  constructor(
    private router: Router,
    private roomService: RoomMapService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createRoom = <CreateRoom>history.state.data;
    if(!this.createRoom) {
      this.router.navigate([`manager/building-map`]);
    }
  }

  public submitForm():void {
    this.createRoom.rgbColour = '#FFFFFF';
    this.roomService.createRoom(this.createRoom)
    .pipe(catchError(res => {
      const error = res.error
      if (error.errors) {
        Object.keys(error.errors).forEach(key => {
          error.errors[key].forEach((err: any) => {
            this.toastService.error(err)
          });
        })
        return EMPTY
      }
      this.toastService.error(error.Message)
      return EMPTY
    }))
    .subscribe(() => {
      this.toastService.success('Successfully created');
      setTimeout(() => {
        this.router.navigate([`manager/room-map/${this.createRoom.mapFloorId}`]);
      }, 1000);
    });
  }

}
