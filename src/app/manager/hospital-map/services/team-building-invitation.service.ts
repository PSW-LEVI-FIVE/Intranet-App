import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamBuildingInvitationService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient) { }


getDoctorSpecialities():Observable<any>{
     return this.http.get<any>(this.apiHost+"api/intranet/doctors/specialities")
}

createTeamBulidingEventForEveryOne(createInvitationDto:any){
  return this.http.post(this.apiHost+"api/intranet/invitations/create/all",createInvitationDto,{ headers: this.headers })
}

createTeamBuildingEventForSpeciality(invitationDto:any){
  return this.http.post(this.apiHost+"api/intranet/invitations/create/special",invitationDto,{ headers: this.headers })
}
getAllInvitationRequests(){
  return this.http.get<any>(this.apiHost+"api/intranet/invitations/all",{ headers: this.headers })
}
getDoctorById(doctorId:any){
  return this.http.get<any>(this.apiHost+"api/intranet/doctors/get/"+doctorId,{ headers: this.headers })
}

}
