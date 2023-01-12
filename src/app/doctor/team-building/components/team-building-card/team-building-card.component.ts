import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { TeamBuildingInvitation } from '../../model/invitation.model';

@Component({
  selector: 'app-team-building-card',
  templateUrl: './team-building-card.component.html',
  styleUrls: ['./team-building-card.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TeamBuildingCardComponent implements OnInit {

  @Input() invitation: TeamBuildingInvitation = {
    id: -1,
    description: '',
    doctorId: -1,
    invitationStatus: 1,
    place: '',
    reason: '',
    startAt: new Date(),
    endAt: new Date(),
    title: 'This is a huge title with many words hehehehhehehehe iookasod aosdpa dpad '
  }

  @Output() acceptedInvitation: EventEmitter<number> = new EventEmitter()
  @Output() declinedInvitation: EventEmitter<number> = new EventEmitter()

  months: any = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
  }
  constructor() { }

  ngOnInit(): void { }

  acceptInvitation(id: number) {
    this.acceptedInvitation.emit(id)
  }

  declineInvitation(id: number) {
    this.declinedInvitation.emit(id)
  }

  formatDate(date: Date) {
    const newDate = new Date(date)
    const month = newDate.getMonth()
    const hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()
    return `${newDate.getFullYear()} - ${this.months[month]} - ${newDate.getDate()} ${hours}:${newDate.getMinutes()}`
  }




}
