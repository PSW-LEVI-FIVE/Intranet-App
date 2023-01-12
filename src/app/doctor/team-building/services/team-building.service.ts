import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamBuildingInvitation } from '../model/invitation.model';

@Injectable({
  providedIn: 'root'
})
export class TeamBuildingService {

  private url: string = "http://localhost:5000/api/intranet/invitations"

  constructor(private readonly httpClient: HttpClient) { }



  getAllUnanswered() {
    const url = `${this.url}/doctor`
    return this.httpClient.get<TeamBuildingInvitation[]>(url)
  }

  acceptInvitation(id: number) {
    const url = `${this.url}/accept/${id}`
    return this.httpClient.patch(url, {})
  }

  declineInvitation(id: number) {
    const url = `${this.url}/decline/${id}`
    return this.httpClient.patch(url, {})
  }
}
