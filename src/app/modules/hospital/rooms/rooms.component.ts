import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Room } from 'src/app/modules/hospital/model/room.model';
import { RoomService } from 'src/app/modules/hospital/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  public dataSource = new MatTableDataSource<Room>();
  public displayedColumns = ['number', 'floor', 'update', 'delete'];
  public rooms: Room[] = [];

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(res => {
      this.rooms = res;
      this.dataSource.data = this.rooms;
    })
  }

  public chooseRoom(id: number) {
    this.router.navigate(['/rooms', id]);
  }

  public updateRoom(id: number) {
    this.router.navigate(['/rooms/' + id + '/update']);
  }

  public deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(res => {
      this.roomService.getRooms().subscribe(res => {
        this.rooms = res;
        this.dataSource.data = this.rooms;
      })
    })
  }

  public addRoom() {
    this.router.navigate(['/rooms/add']);
  }
}