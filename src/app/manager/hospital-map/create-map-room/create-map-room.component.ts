import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { CreateRoom, RoomType } from '../model/room.model';
import { RoomMapService } from '../services/room-map.service';

@Component({
  selector: 'app-create-map-room',
  templateUrl: './create-map-room.component.html',
  styleUrls: ['./create-map-room.component.css']
})
export class CreateMapRoomComponent implements OnInit {

  public createRoom: CreateRoom = <CreateRoom>{};
  public roomType: RoomType[] = [
    { value: 0, name: 'No type' },
    { value: 1, name: 'Operation room' },
    { value: 2, name: 'Examination room' },
    { value: 3, name: 'Hospital room' },
    { value: 4, name: 'Cafeteria' },
  ];

  public selectedType = this.roomType[0].value;

  constructor(
    public dialogRef: MatDialogRef<CreateMapRoomComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CreateRoom,
    private router: Router,
    private roomService: RoomMapService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    // this.createRoom = <CreateRoom>history.state.data;
    this.createRoom = this.data
    if (!this.createRoom) {
      this.router.navigate([`manager/building-map`]);
    }
  }

  public submitForm(): void {
    this.createRoom.rgbColour = '#FFFFFF';
    this.createRoom.roomType = this.selectedType;
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
