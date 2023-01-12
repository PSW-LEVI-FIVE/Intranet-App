import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { TeamBuildingInvitationService } from '../hospital-map/services/team-building-invitation.service';
export interface ISpeciality{  
id: number,
name: string
}
export interface ICreateInvitation {
  title: string,
  description: string,
  place: string,
  startAt: Date,
  endAt: Date,
  invitationStatus: number,
  doctorId: number,
  specialityId: number

}


@Component({
  selector: 'app-team-building-invitations',
  templateUrl: './team-building-invitations.component.html',
  styleUrls: ['./team-building-invitations.component.css']
})
export class TeamBuildingInvitationsComponent implements OnInit {


  constructor(
    private router:Router,
    private inivitationService:TeamBuildingInvitationService,
    private readonly toastService: ToastrService,) { }
    from:any
    to:any
    option:any
    public startDate: Date = new Date()
    public endDate: Date = new Date()
specialties:ISpeciality[] = []
invite:ISpeciality ={id:0, name:''}
public title: string = '';
  public description: string =""
  public place: string = "";
  public name: string = ""


  ngOnInit(): void {
    this.inivitationService.getDoctorSpecialities().subscribe(res=>
      {
        
        this.specialties = res
        this.specialties.push({id:100, name:"Invite all"})
        
      })
  }
  convertToDateTime(date: Date, time: string) {
    let chunks = time.split(":")
    let newDate = new Date(date)
    newDate.setHours(+chunks[0], +chunks[1], 0)
    newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60)

    return newDate
  }
  createEvent(){
    if (this.from == '' || this.to == '' || this.description==''|| this.title==''|| this.place=='') {
      this.toastService.error("All fields should be filled!")
      return
    }
    let startTime  = this.convertToDateTime(this.startDate,this.from)
    let endTime =  this.convertToDateTime(this.endDate,this.to)
    
    let body: ICreateInvitation = {
      specialityId:this.invite.id,
      startAt:startTime ,
      endAt:endTime ,
      description:this.description,
      place:this.place,
      title:this.title,
      invitationStatus:2,
      doctorId:0
    }
    console.log(body)
    console.log(this.invite)
    if(this.invite.name =='Invite all'){
      
    this.inivitationService.createTeamBulidingEventForEveryOne(body).pipe(catchError(res => {
      const error = res.error
      this.toastService.error(error.Message)
      return EMPTY
    })).subscribe(res => {
      this.toastService.success("Successfully created team building event")
      setTimeout(() => {
        this.router.navigate(["manager/invitation-menu"])
      }, 1000)})
    }
    else{
      
      this.inivitationService.createTeamBuildingEventForSpeciality(body).pipe(catchError(res => {
        const error = res.error
        this.toastService.error(error.Message)
        return EMPTY
      })).subscribe(res => {
        this.toastService.success("Successfully created team building event")
        setTimeout(() => {
          this.router.navigate(["manager/invitation-menu"])
        }, 1000)})
    }
  }




}
