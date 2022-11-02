import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Room } from "../model/room.model";
import { RoomService } from "../services/room.service";

@Component({
  selector: 'de-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})

export class UpdateRoomComponent implements OnInit {

  public room: Room | undefined = undefined;

  constructor(private roomService: RoomService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.roomService.getRoom(params['id']).subscribe(res => {
        this.room = res;
      })
    });
  }

  public updateRoom(): void {
    if (!this.isValidInput()) return;
    this.roomService.updateRoom(this.room).subscribe(res => {
      this.router.navigate(['/rooms']);
    });
  }

  private isValidInput(): boolean {
    return this.room?.number != '' && this.room?.floor.toString() != '';
  }
}
